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
    public class AssetController : ControllerBase
    {
        private readonly MyContext _context;

        public AssetController(MyContext context)
        {
            _context = context;
        }
        //* GET: api/Asset
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Asset>>> GetAllAssets()
        {
            return await _context.Assets.ToListAsync();
        }
        //* GET: api/Asset/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<Asset>> GetAssetById(int id)
        {
            var asset = await _context.Assets.FindAsync(id);
            if (asset == null)
            {
                return NotFound();
            }
            return asset;
        }
        //* POST: api/CreateAsset
        [HttpPost]
        public async Task<ActionResult<Asset>> CreateAsset(Asset NewAsset)
        {
            _context.Assets.Add(NewAsset);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(Asset), new { id = NewAsset.AssetId }, NewAsset);
        }
        //* DELETE: api/Asset/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAsset(int id)
        {
            var asset = await _context.Assets.FindAsync(id);
            if (asset == null)
            {
                return NotFound();
            }

            _context.Assets.Remove(asset);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}