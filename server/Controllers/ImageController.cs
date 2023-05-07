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
        [HttpPost]
        public async Task<ActionResult<Image>> CreateImage(Image NewImage)
        {
            _context.Images.Add(NewImage);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(Image), new { id = NewImage.ImageId }, NewImage);
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