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

        public ImageController(MyContext context)
        {
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
            Game? Game = await _context.Games.FindAsync(id);


            var allowedExtensions = new[] { ".jpg", ".jpeg", ".png", ".gif",".webp" }; // Add more if needed
            var extension = Path.GetExtension(image.FileName).ToLower();
            if (!allowedExtensions.Contains(extension))
            {
                return BadRequest("Invalid file type. Allowed file types are: " + string.Join(", ", allowedExtensions));
            }
            if (image != null && image.Length > 0)
            {
                var fileName = Path.GetFileName(image.FileName);
                var filePath = Path.Combine("wwwroot", "uploads",Game.GameId.ToString(),"images", fileName);

                using (var fileStream = new FileStream(filePath, FileMode.Create))
                {
                    await image.CopyToAsync(fileStream);
                }
                var NewImage = new Image { GameId = Game.GameId, FileName = filePath };
                _context.Images.Add(NewImage);
                await _context.SaveChangesAsync();
                return  StatusCode(200,CreatedAtAction(nameof(Image), new { id = NewImage.ImageId }, NewImage));
            }

            return BadRequest("No image was uploaded");

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