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
            return await _context.Games.ToListAsync();
        }

        // // POST: api/TodoItems
        // [HttpPost]
        // public async Task<ActionResult<TodoItem>> PostTodoItem(TodoItem item)
        // {
        //     _context.TodoItems.Add(item);
        //     await _context.SaveChangesAsync();

        //     return CreatedAtAction(nameof(GetTodoItem), new { id = item.Id }, item);
        // }

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

        // DELETE: api/TodoItems/5
        // [HttpDelete("{id}")]
        // public async Task<IActionResult> DeleteTodoItem(int id)
        // {
        //     var todoItem = await _context.TodoItems.FindAsync(id);
        //     if (todoItem == null)
        //     {
        //         return NotFound();
        //     }

        //     _context.TodoItems.Remove(todoItem);
        //     await _context.SaveChangesAsync();

        //     return NoContent();
        // }
    }
}
