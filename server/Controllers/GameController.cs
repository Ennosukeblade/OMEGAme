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
    public class GameController : ControllerBase
    {
        private readonly MyContext _context;

        public GameController(MyContext context)
        {
            _context = context;
        }

        // GET: api/game
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Game>>> GetAllGames()
        {
            List <Game> AllGames = _context.Games.Include(g=>g.Creator).ToList();
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
        
        //* POST: api/CreateGame
        [HttpPost]
        public async Task<ActionResult<Game>> CreateGame(Game NewGame)
        {
            _context.Games.Add(NewGame);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(Game), new { id = NewGame.GameId }, NewGame);
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

            _context.Games.Remove(game);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
