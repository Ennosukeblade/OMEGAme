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
            return await _context.GameJams.ToListAsync();
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
            return StatusCode(200,CreatedAtAction(nameof(GameJam), new { id = NewGameJam.GameJamId }, NewGameJam));
        }
    }
}