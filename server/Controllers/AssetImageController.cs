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
        [HttpPost]
        public async Task<ActionResult<AssetImage>> CreateAssetImage(AssetImage NewAssetImage)
        {
            _context.AssetImages.Add(NewAssetImage);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(AssetImage), new { id = NewAssetImage.AssetImageId }, NewAssetImage);
        }
    }
}