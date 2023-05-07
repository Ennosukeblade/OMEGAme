using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Http;
using server.Models;

namespace server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly ILogger<UserController> _logger;
        private readonly MyContext _context;

        public UserController(ILogger<UserController> logger, MyContext context)
        {
            _logger = logger;
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


        //* Post: api/User/Login
        [HttpPost("login")]
        public async Task<ActionResult<LoginUser>> Login(LoginUser user)
        {
            if (ModelState.IsValid)
            {

                //! Login
                //! search for a user that match the login email
                var UserFromDb = await _context.Users.FirstOrDefaultAsync(u => u.Email == user.LoginEmail);
                if (UserFromDb == null)
                {
                    return Unauthorized("Invalid Email/Password");
                }
                PasswordHasher<LoginUser> hasher = new PasswordHasher<LoginUser>();
                //!  verify Password 
                var result = hasher.VerifyHashedPassword(user, hashedPassword: UserFromDb.Password, user.LoginPassword);
                if (result == 0)
                {
                    return Unauthorized("Invalid Email/Password");
                }
                HttpContext.Session.SetInt32("userId", UserFromDb.UserId);
                return Ok(UserFromDb);
            }
            return BadRequest();
        }
        //* POST: api/User/Register
        [HttpPost("Register")]
        public async Task<ActionResult<User>> RegisterUser(User NewUser)
        {
            if (ModelState.IsValid)
            {
                // Email exist ?
                if (_context.Users.Any(u => u.Email == NewUser.Email))
                {
                    return Unauthorized("Email already taken");
                }
                else
                {
                    // NO
                    // Hash Password
                    PasswordHasher<User> Hasher = new PasswordHasher<User>();
                    NewUser.Password = Hasher.HashPassword(NewUser, NewUser.Password);
                    System.Console.WriteLine(NewUser.Password);
                    // Add
                    _context.Add(NewUser);
                    // Save
                    await _context.SaveChangesAsync();
                    HttpContext.Session.SetInt32("userId", NewUser.UserId);
                    return Ok();
                }
            }
            return BadRequest();
        }
    }
}