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
    public class UserController : ControllerBase
    {
        private readonly MyContext _context;

        public UserController(MyContext context)
        {
            _context = context;
        }
        //* GET: api/user
        [HttpGet]
        public async Task<ActionResult<IEnumerable<User>>> GetAllUsers()
        {
            return await _context.Users.ToListAsync();
        }
        //* GET: api/User/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<User>> GetUserById(int id)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null)
            {
                return NotFound();
            }
            return user;
        }
        //* POST: api/User
        [HttpPost]
        public async Task<ActionResult<User>> CreateUser(User NewUser)
        {
            _context.Users.Add(NewUser);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(User), new { id = NewUser.UserId }, NewUser);
        }
    }
}