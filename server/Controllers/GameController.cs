using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.IO.Compression;
using System.IO;
using Microsoft.AspNetCore.Hosting;
using server.Models;

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
        public async Task<ActionResult<IEnumerable<Game>>> GetAllGames()
        {
            List<Game> AllGames = _context.Games.Include(g => g.Creator).ToList();
            return await _context.Games.ToListAsync();
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
        // [HttpPost]
        // public async Task<ActionResult<Game>> CreateGame(Game NewGame)
        // {
        //     _context.Games.Add(NewGame);
        //     await _context.SaveChangesAsync();
        //     return CreatedAtAction(nameof(Game), new { id = NewGame.GameId }, NewGame);
        // }
        // //* POST: api/Game
        [HttpPost("upload")]
        public async Task<IActionResult> UploadFile(IFormFile file, Game newGame)
        {
            // Add
            _context.Add(newGame);
            // Save
            await _context.SaveChangesAsync();

            if (file == null || file.Length == 0)
            {
                return BadRequest("Please provide a file");
            }

            // Uncompress the file
            using var stream = new MemoryStream();
            await file.CopyToAsync(stream);
            using var archive = new ZipArchive(stream);
            var extractionPath = Path.Combine(_hostingEnvironment.WebRootPath, "uploads");
            archive.ExtractToDirectory(extractionPath);

            // Rename the folder
            var gameId = newGame.GameId.ToString();
            var folderName = $"{gameId}";
            var oldPath = Path.Combine(extractionPath, "Games");
            var newPath = Path.Combine(extractionPath, folderName);
            Directory.Move(oldPath, newPath);
            newGame.Path = newPath;


            // Find the index.html file
            var indexHtmlPath = Path.Combine(newPath, "index.html");

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
