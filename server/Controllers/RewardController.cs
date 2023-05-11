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
    public class RewardController : ControllerBase
    {
        private readonly MyContext _context;

        public RewardController(MyContext context)
        {
            _context = context;
        }
        //* GET: api/Reward
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Reward>>> GetAllRewards()
        {
            return await _context.Rewards.ToListAsync();
        }
        //* GET: api/Reward/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<Reward>> GetRewardById(int id)
        {
            var reward = await _context.Rewards.FindAsync(id);
            if (reward == null)
            {
                return NotFound();
            }
            return reward;
        }
        //* POST: api/Reward
        [HttpPost]
        public async Task<ActionResult<Reward>> CreateReward(Reward NewReward)
        {
            _context.Rewards.Add(NewReward);
            await _context.SaveChangesAsync();
            return StatusCode(200,CreatedAtAction(nameof(Reward), new { id = NewReward.RewardId }, NewReward));
        }
    }
}