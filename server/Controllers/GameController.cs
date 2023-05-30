using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.IO.Compression;
using server.Models;
using Microsoft.VisualBasic.FileIO;
using System.Net;
using System.Net.Http.Headers;
using Microsoft.Extensions.FileProviders;
using Microsoft.AspNetCore.StaticFiles;
using Microsoft.Extensions.Options;
namespace server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GameController : ControllerBase
    {
        private readonly MyContext _context;
        private readonly IWebHostEnvironment _hostingEnvironment;
        private readonly ILogger<GameController> _logger;


        public GameController(MyContext context, IWebHostEnvironment hostingEnvironment, ILogger<GameController> logger)
        {
            _hostingEnvironment = hostingEnvironment;
            _context = context;
            _logger = logger;

        }
        [HttpGet("gameJam/games/{id}")]
        public async Task<ActionResult<Game>> GetGameJamGames(int id)
        {
            List<Game> GameJamGames = await _context.Games.Include(c => c.MyImages).Include(c => c.Creator).Include(v=>v.GameVotes).Where(j => j.GameJamId == id).ToListAsync();

            return StatusCode(200, GameJamGames);
        }
        //* POST: api/GameJam
        [HttpGet("download/{id}")]
        public FileResult DownloadFolder(int id)
        {
            Game? Game = _context.Games.FirstOrDefault(u => u.GameId == id);
            // Replace 'folderPath' with the actual path of your folder
            string folderPath = Path.Combine(_hostingEnvironment.WebRootPath, "uploads", id.ToString());
            string zipFileName = Game.Title + ".zip";
            string zipPath = Path.Combine(Path.GetTempPath(), "downloaded-folder.zip");


            if (System.IO.File.Exists(zipPath))
            {
                System.IO.File.Delete(zipPath);
            }

            ZipFile.CreateFromDirectory(folderPath, zipPath);
            byte[] fileBytes = System.IO.File.ReadAllBytes(zipPath);

            var fileContent = new ByteArrayContent(fileBytes);
            var response = new HttpResponseMessage(HttpStatusCode.OK)
            {
                Content = fileContent
            };
            response.Content.Headers.ContentDisposition = new ContentDispositionHeaderValue("attachment")
            {
                FileName = Game.Title + ".zip"
            };
            response.Content.Headers.ContentType = new MediaTypeHeaderValue("application/zip");

            return File(fileBytes, "application/zip", Game.Title + ".zip");

        }
        // GET: api/game
        [HttpGet]
        public async Task<ActionResult<Game>> GetAllGames()
        {
            List<Game> AllGames = await _context.Games.Include(g => g.Creator).Include(i => i.MyImages).Include(c => c.InGameComments).ThenInclude(u => u.User).Where(g => g.GameJamId == null).ToListAsync();
            return Ok(AllGames);
        }

        //* GET: api/Game/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<Game>> GetGameId(int id)
        {
            Game? game = await _context.Games.Include(u => u.Creator).Include(i => i.MyImages).Include(c => c.InGameComments).Include(i=>i.InGameJam).Include(v=>v.GameVotes).FirstOrDefaultAsync(u => u.GameId == id);
            if (game == null)
            {
                return NotFound();
            }
            return Ok(game);
        }
        // //* POST: api/CreateGame
        [HttpPost]
        public async Task<ActionResult<Game>> CreateGame(Game NewGame)
        {
            _context.Games.Add(NewGame);
            await _context.SaveChangesAsync();
            return StatusCode(200, CreatedAtAction(nameof(Game), new { id = NewGame.GameId }, NewGame));
        }
        //* POST: api/Game
        [DisableRequestSizeLimit]
        [HttpPost("upload/{id}")]
        public async Task<IActionResult> UploadFile(IFormFile file, int id)
        {
            Game? newGame = await _context.Games.FindAsync(id);

            if (file == null || file.Length == 0)
            {
                return BadRequest("Please provide a file");
            }

            // Uncompress the file
            using var stream = new MemoryStream();
            await file.CopyToAsync(stream);
            var fileName = Path.GetFileNameWithoutExtension(file.FileName);
            using var archive = new ZipArchive(stream);
            var extractionPath = Path.Combine(_hostingEnvironment.WebRootPath, "uploads");
            archive.ExtractToDirectory(extractionPath);
            var directoryName = new DirectoryInfo(extractionPath).GetDirectories().LastOrDefault()?.Name;

            // Rename the folder
            var folderName = $"{id}";
            var oldPath = Path.Combine(extractionPath, directoryName);
            FileSystem.RenameDirectory(oldPath, folderName);
            System.Console.WriteLine(oldPath);

            var hostUrl = $"{Request.Scheme}://{Request.Host.Value}";
            //* Update Game
            var newPath = Path.Combine(hostUrl, "uploads", folderName);
            Directory.CreateDirectory(Path.Combine(extractionPath, id.ToString(), "images"));
            newGame.Path = newPath;
            // Find the index.html file
            var indexHtmlPath = Path.Combine(Path.Combine(extractionPath, id.ToString()), "index.html");
            if (System.IO.File.Exists(indexHtmlPath))

            {
                newGame.isPlayable = true;
            }
            await _context.SaveChangesAsync();
            return Ok();
            //* return File(System.IO.File.ReadAllBytes(indexHtmlPath), "text/html");
        }


        // PUT: api/TodoItems/5
        //[HttpPut("{id}")]
        // public async Task<IActionResult> PutTodoItem(int id, TodoItem item)
        // {
        //     if (id != item.Id)
        //     {
        //         return BadRequest();
        //     }

        //     _context.Entry(item).State = EntityState.Modified;
        //     await _context.SaveChangesAsync();

        //     return NoContent();
        // }

        //* DELETE: api/Game/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteGame(int id)
        {
            var game = await _context.Games.FindAsync(id);
            if (game == null)
            {
                return NotFound();
            }
            if (Directory.Exists(game.Path))
            {
                Directory.Delete(game.Path, true);
            }
            _context.Games.Remove(game);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
