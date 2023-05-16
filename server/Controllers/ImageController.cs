using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.IO;
using server.Models;

namespace server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ImageController : ControllerBase
    {
        private readonly MyContext _context;
        private readonly IWebHostEnvironment _hostingEnvironment;
        public ImageController(MyContext context, IWebHostEnvironment hostingEnvironment)
        {
            _hostingEnvironment = hostingEnvironment;
            _context = context;
        }
        //* GET: api/Image
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Image>>> GetAllImages()
        {
            return await _context.Images.ToListAsync();
        }
        //* GET: api/Image/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<Image>> GetImageById(int id)
        {
            var image = await _context.Images.FindAsync(id);
            if (image == null)
            {
                return NotFound();
            }
            return image;
        }
        //* POST: api/Image
        [HttpPost("{id}")]
        public async Task<ActionResult<Image>> CreateImage(IFormFile image, int id)
        {
            Game? game = await _context.Games.FindAsync(id);

            if (image == null || image.Length == 0)
            {
                return NotFound(); // Return appropriate response if the game with the given id is not found
            }

            if (image != null)
            {


                var allowedExtensions = new[] { ".jpg", ".jpeg", ".png", ".gif", ".webp" }; // Add more if needed

                Console.WriteLine(image.FileName);
                var extension = Path.GetExtension(image.FileName).ToLower();

                if (!allowedExtensions.Contains(extension))
                {
                    return BadRequest("Invalid file type. Allowed file types are: " + string.Join(", ", allowedExtensions));
                }

                if (image.Length > 0)
                {
                    var fileName = Path.GetFileName(image.FileName);
                    if (!System.IO.File.Exists(Path.Combine(_hostingEnvironment.WebRootPath,"uploads",id.ToString(), "images")))
                    {
                        Directory.CreateDirectory(Path.Combine(_hostingEnvironment.WebRootPath,"uploads",id.ToString(), "images"));
                    }
                    
                    var filePath = Path.Combine(_hostingEnvironment.WebRootPath,"uploads",id.ToString(), "images", fileName);

                    using (var fileStream = new FileStream(filePath, FileMode.Create))
                    {
                        await image.CopyToAsync(fileStream);
                    }

                    var newImage = new Image { GameId = game.GameId, FileName = filePath };

                    _context.Images.Add(newImage);
                    await _context.SaveChangesAsync();
                }

                return Ok("Images uploaded successfully");
            }

            return BadRequest("No images were uploaded");
        }
        //* DELETE: api/Image/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteImage(int id)
        {
            var image = await _context.Images.FindAsync(id);
            if (image == null)
            {
                return NotFound();
            }
            _context.Images.Remove(image);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}