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
    public class VoteController : ControllerBase
    {
        private readonly MyContext _context;

        public VoteController(MyContext context)
        {
            _context = context;
        }
        //* GET: api/Vote
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Vote>>> GetAllVotes()
        {
            return await _context.Votes.ToListAsync();
        }
        //* GET: api/Vote/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<Vote>> GetVoteById(int id)
        {
            var vote = await _context.Votes.FindAsync(id);
            if (vote == null)
            {
                return NotFound();
            }
            return vote;
        }
        //* POST: api/Vote
        [HttpPost]
        public async Task<ActionResult<Vote>> CreateVote(Vote NewVote)
        {
            _context.Votes.Add(NewVote);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(Vote), new { id = NewVote.VoteId }, NewVote);
        }
        //* DELETE: api/Vote/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteVote(int id)
        {
            var vote = await _context.Votes.FindAsync(id);
            if (vote == null)
            {
                return NotFound();
            }

            _context.Votes.Remove(vote);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}