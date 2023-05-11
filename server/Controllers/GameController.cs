using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.IO.Compression;
using server.Models;
using Microsoft.VisualBasic.FileIO;
using System.Text.Json;
using System.Text.Json.Serialization;

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
            List<Game> AllGames = await _context.Games.Include(g => g.MyImages).ToListAsync();
            //return AllGames;


            //     var options = new JsonSerializerOptions
            //     {
            //         ReferenceHandler = ReferenceHandler.Preserve,
                    
            //     };

            // var jsonString = JsonSerializer.Serialize(AllGames, options);

            return Ok(AllGames);
        }
        //* GET: api/Game/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<Game>> GetGameById(int id)
        {
            var game = await _context.Games.FindAsync(id);
            if (game == null)
            {
                return NotFound();
            }
            return game;
        }
        // [HttpGet("{id}")]
        // public IActionResult GetFile(string id)
        // {
        //     var filePath = Path.Combine(_hostingEnvironment.ContentRootPath, "AllGames", id, "index.html");

        //     if (!System.IO.File.Exists(filePath))
        //     {
        //         return NotFound();
        //     }

        //     var fileBytes = System.IO.File.ReadAllBytes(filePath);
        //     var contentType = "text/html";
        //     return File(fileBytes, contentType);
        // }
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
