using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.IO.Compression;
using server.Models;
using Microsoft.VisualBasic.FileIO;

namespace server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GameController : ControllerBase
    {
        private readonly MyContext _context;
        private readonly IWebHostEnvironment _hostingEnvironment;

        public GameController(MyContext context, IWebHostEnvironment hostingEnvironment)
        {
            _hostingEnvironment = hostingEnvironment;
            _context = context;
        }

        // GET: api/game
        [HttpGet]
        public async Task<ActionResult<Game>> GetAllGames()
        {
            List<Game> AllGames = await _context.Games.Include(g => g.Creator).Include(i=>i.MyImages).Where(g=>g.GameJamId==null).ToListAsync();
            return Ok(AllGames);
        }

        //* GET: api/Game/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<Game>> GetGameById(int id)
        {
            Game? game = await _context.Games.Include(u=>u.Creator).Include(i=>i.MyImages).Include(c=>c.InGameComments).FirstOrDefaultAsync(u=>u.GameId==id);
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

            //* Update Game
            var newPath = Path.Combine(extractionPath, folderName);
            Directory.CreateDirectory(Path.Combine(newPath, "images"));
            newGame.Path = newPath;
            // Find the index.html file
            var indexHtmlPath = Path.Combine(newPath, "index.html");
            if (indexHtmlPath != null)
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
