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
    public class CommentController : ControllerBase
    {
        private readonly MyContext _context;

        public CommentController(MyContext context)
        {
            _context = context;
        }
        //* GET: api/Comment
        [HttpGet("{id}")]
        public async Task<ActionResult<Comment>> GetAllComments(int id)
        {
            List<Comment?> GameComment = await _context.Comments.Include(u => u.User).Where(g => g.GameId == id).ToListAsync();
            return Ok(GameComment);
        }
        //* GET: api/Comment/{id}
        // [HttpGet("{id}")]
        // public async Task<ActionResult<Comment>> GetCommentById(int id)
        // {
        //     var user = await _context.Comments.FindAsync(id);
        //     if (user == null)
        //     {
        //         return NotFound();
        //     }
        //     return user;
        // }
        //* POST: api/Comment
        [HttpPost]
        public async Task<ActionResult<Comment>> CreateComment(Comment NewComment)
        {
            _context.Comments.Add(NewComment);
            await _context.SaveChangesAsync();
            return StatusCode(200, CreatedAtAction(nameof(Comment), new { id = NewComment.CommentId }, NewComment));
        }
        //* DELETE: api/Comment/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteComment(int id)
        {
            var comment = await _context.Comments.FindAsync(id);
            if (comment == null)
            {
                return NotFound();
            }

            _context.Comments.Remove(comment);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}