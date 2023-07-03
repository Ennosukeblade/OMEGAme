using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.IdentityModel.Tokens;
using server.Models;
using System.Security.Claims;
using System.Text;
using System.Security.Cryptography;

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
            var user = await _context.Users.Include(m => m.MyVotes).FirstOrDefaultAsync(c => c.UserId == id);
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
                //HttpContext.Session.SetInt32("userId", UserFromDb.UserId);
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
                    // Generate JWT token
                    var tokenHandler = new JwtSecurityTokenHandler();

                    // Manually specify the secret key
                    var key = Encoding.ASCII.GetBytes("mouadhandoussemaprojectbechykasserdenya123"); // Replace "your_secret_key" with your desired key

                    try
                    {
                        var tokenDescriptor = new SecurityTokenDescriptor
                        {
                            Subject = new ClaimsIdentity(new[]
                            {
                new Claim("userId", NewUser.UserId.ToString()),
                new Claim("email", NewUser.Email),
                // Add additional claims as needed
            }),
                            Expires = DateTime.UtcNow.AddDays(7), // Set the token expiration time
                            SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
                        };

                        var token = tokenHandler.CreateToken(tokenDescriptor);
                        var encryptedToken = tokenHandler.WriteToken(token);

                        return Ok(new { token = encryptedToken });
                    }
                    catch (Exception ex)
                    {
                        // Handle token generation exception
                        return BadRequest("Failed to generate JWT token: " + ex.Message);
                    }
                    // return StatusCode(200, CreatedAtAction(nameof(User), new { id = NewUser.UserId }, NewUser));
                }

            }
            return BadRequest();
        }
    }
}
