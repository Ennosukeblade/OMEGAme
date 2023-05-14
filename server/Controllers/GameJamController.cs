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

        public GameJamController(MyContext context)
        {
            _context = context;
        }
        //* GET: api/GameJam
        [HttpGet]
        public async Task<ActionResult<IEnumerable<GameJam>>> GetAllGameJams()
        {
            return await _context.GameJams.Include(u=>u.Creator).ToListAsync();
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
        .ThenInclude(g => g.InGameComments)
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
        //* POST: api/GameJam
        [HttpPost]
        public async Task<ActionResult<GameJam>> CreateGameJam(GameJam NewGameJam)
        {
            _context.GameJams.Add(NewGameJam);
            await _context.SaveChangesAsync();
            return StatusCode(200, CreatedAtAction(nameof(GameJam), new { id = NewGameJam.GameJamId }, NewGameJam));
        }
    }
}