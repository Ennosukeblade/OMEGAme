using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using server.Models;

namespace server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GameJamController : ControllerBase
    {
        private readonly MyContext _context;
        private readonly IWebHostEnvironment _hostingEnvironment;

        public GameJamController(MyContext context, IWebHostEnvironment hostingEnvironment)
        {
            _hostingEnvironment = hostingEnvironment;
            _context = context;
        }
        //* GET: api/GameJam
        [HttpGet]
        public async Task<ActionResult<IEnumerable<GameJam>>> GetAllGameJams()
        {
            return await _context.GameJams.Include(u => u.Creator).ToListAsync();
        }
        //* GET: api/GameJam/games
        [HttpGet("games/{id}")]
        public async Task<ActionResult<GameJam>> GetAllGameJamGames(int id)
        {
            List<GameJam> AllGameJamGames = await _context.GameJams
    .Include(g => g.MyInGames)
            .ThenInclude(g => g.Creator)
    .Include(g => g.MyInGames)
        .ThenInclude(igj => igj.GameVotes)
    .Include(g => g.MyInGames)
        .ThenInclude(g => g.MyImages)
    .Where(g => g.GameJamId == id)
    .ToListAsync();
            return Ok(AllGameJamGames);
        }

        //* GET: api/GameJam/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<GameJam>> GetGameJamById(int id)
        {
            var gameJam = await _context.GameJams.FindAsync(id);
            if (gameJam == null)
            {
                return NotFound();
            }
            return gameJam;
        }
        
        [HttpPost]
        public async Task<ActionResult<GameJam>> CreateGameJam(GameJam NewGameJam)
        {
            _context.GameJams.Add(NewGameJam);
            await _context.SaveChangesAsync();
            return StatusCode(200, CreatedAtAction(nameof(GameJam), new { id = NewGameJam.GameJamId }, NewGameJam));

        }
        //* POST: api/Image
        [HttpPost("Image/{id}")]
        public async Task<ActionResult<Image>> CreateGameJamImage(IFormFile image, int id)
        {
            GameJam? gameJam = await _context.GameJams.FindAsync(id);

            if (image == null || image.Length == 0)
            {
                return NotFound(); // Return appropriate response if the game with the given id is not found
            }

            if (image != null)
            {


                var allowedExtensions = new[] { ".jpg", ".jpeg", ".png", ".gif", ".webp" }; // Add more if needed

                Console.WriteLine(image.FileName);
                var extension = Path.GetExtension(image.FileName).ToLower();

                if (!allowedExtensions.Contains(extension))
                {
                    return BadRequest("Invalid file type. Allowed file types are: " + string.Join(", ", allowedExtensions));
                }

                if (image.Length > 0)
                {
                    var fileName = Path.GetFileName(image.FileName);

                    Directory.CreateDirectory(Path.Combine(_hostingEnvironment.WebRootPath, "GameJam Images", id.ToString()));

                    var filePath = Path.Combine(_hostingEnvironment.WebRootPath, "GameJam Images", id.ToString(), fileName);

                    using (var fileStream = new FileStream(filePath, FileMode.Create))
                    {
                        await image.CopyToAsync(fileStream);
                    }
                    var hostUrl = $"{Request.Scheme}://{Request.Host.Value}";
                    gameJam.Image = Path.Combine(hostUrl,"GameJam Images",id.ToString(), fileName);

                    await _context.SaveChangesAsync();
                }

                return Ok("Images uploaded successfully");
            }

            return BadRequest("No images were uploaded");
        }
    }
}