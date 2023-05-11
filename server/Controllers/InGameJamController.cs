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
    public class InGameJamController : ControllerBase
    {
        private readonly MyContext _context;

        public InGameJamController(MyContext context)
        {
            _context = context;
        }
        //* GET: api/InGameJam
        [HttpGet]
        public async Task<ActionResult<IEnumerable<InGameJam>>> GetAllInGameJams()
        {
            return await _context.InGameJams.ToListAsync();
        }
        //* GET: api/InGameJam/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<InGameJam>> GetInGameJamById(int id)
        {
            var inGameJam = await _context.InGameJams.FindAsync(id);
            if (inGameJam == null)
            {
                return NotFound();
            }
            return inGameJam;
        }
        //* POST: api/InGameJam
        [HttpPost]
        public async Task<ActionResult<InGameJam>> CreateInGameJam(InGameJam NewInGameJam)
        {
            _context.InGameJams.Add(NewInGameJam);
            await _context.SaveChangesAsync();
            return StatusCode(200,CreatedAtAction(nameof(InGameJam), new { id = NewInGameJam.InGameJamId }, NewInGameJam));
        }
    }
}