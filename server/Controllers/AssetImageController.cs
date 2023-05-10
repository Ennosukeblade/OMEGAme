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
    public class AssetImageController : ControllerBase
    {
        private readonly MyContext _context;

        public AssetImageController(MyContext context)
        {
            _context = context;
        }
        //* GET: api/AssetImage
        [HttpGet]
        public async Task<ActionResult<IEnumerable<AssetImage>>> GetAllAssetImages()
        {
            return await _context.AssetImages.ToListAsync();
        }
        //* GET: api/AssetImage/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<AssetImage>> GetAssetImageById(int id)
        {
            var AssetImage = await _context.AssetImages.FindAsync(id);
            if (AssetImage == null)
            {
                return NotFound();
            }
            return AssetImage;
        }
        //* POST: api/AssetImage
        [HttpPost("upload/{id}")]
        public async Task<ActionResult<AssetImage>> CreateAssetImage(IFormFile image, int id)
        {
            Asset? Asset = await _context.Assets.FindAsync(id);


            var allowedExtensions = new[] { ".jpg", ".jpeg", ".png", ".gif",".webp" }; // Add more if needed
            var extension = Path.GetExtension(image.FileName).ToLower();
            if (!allowedExtensions.Contains(extension))
            {
                return BadRequest("Invalid file type. Allowed file types are: " + string.Join(", ", allowedExtensions));
            }
            if (image != null && image.Length > 0)
            {
                var fileName = Path.GetFileName(image.FileName);
                var filePath = Path.Combine("wwwroot", "ModelAssets",Asset.AssetId.ToString(),"images", fileName);

                using (var fileStream = new FileStream(filePath, FileMode.Create))
                {
                    await image.CopyToAsync(fileStream);
                }
                var NewAssetImage = new AssetImage { AssetId = Asset.AssetId, FileName = filePath };
                _context.AssetImages.Add(NewAssetImage);
                await _context.SaveChangesAsync();
                return  CreatedAtAction(nameof(AssetImage), new { id = NewAssetImage.AssetImageId }, NewAssetImage);
            }

            return BadRequest("No image was uploaded");

        }
        //* DELETE: api/AssetImage/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAssetImage(int id)
        {
            var assetImage = await _context.AssetImages.FindAsync(id);
            if (assetImage == null)
            {
                return NotFound();
            }

            _context.AssetImages.Remove(assetImage);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}