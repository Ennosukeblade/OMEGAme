using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.IO.Compression;
using Microsoft.VisualBasic.FileIO;
using server.Models;

namespace server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AssetController : ControllerBase
    {
        private readonly MyContext _context;
        private readonly IWebHostEnvironment _hostingEnvironment;

        public AssetController(MyContext context, IWebHostEnvironment hostingEnvironment)
        {
            _hostingEnvironment = hostingEnvironment;
            _context = context;
        }
        //* GET: api/Asset
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Asset>>> GetAllAssets()
        {
            return await _context.Assets.ToListAsync();
        }
        // //* GET: api/Asset/{id}
        // [HttpGet("{id}")]
        // public async Task<ActionResult<Asset>> GetAssetById(int id)
        // {
        //     var asset = await _context.Assets.FindAsync(id);
        //     if (asset == null)
        //     {
        //         return NotFound();
        //     }
        //     return asset;
        // }
        //* POST: api/CreateAsset
        [HttpPost]
        public async Task<ActionResult<Asset>> CreateAsset(Asset NewAsset)
        {
            _context.Assets.Add(NewAsset);
            await _context.SaveChangesAsync();
            return StatusCode(200, CreatedAtAction(nameof(Asset), new { id = NewAsset.AssetId }, NewAsset));
        }
        [HttpPost("upload/{id}")]
        public async Task<IActionResult> UploadAsset(IFormFile file, int id)
        {
            Asset? newAsset = await _context.Assets.FindAsync(id);

            if (file == null || file.Length == 0)
            {
                return BadRequest("Please provide a file");
            }

            var folderName = $"{id}";
            var extractionPath = Path.Combine(_hostingEnvironment.WebRootPath, "ModelAssets", folderName);
            Directory.CreateDirectory(extractionPath);
            var filePath = Path.Combine(extractionPath, file.FileName); // Generate the file path

            using (var fileStream = new FileStream(filePath, FileMode.Create))
            {
                await file.CopyToAsync(fileStream);
            }

            

            var directoryName = new DirectoryInfo(extractionPath).GetDirectories().LastOrDefault()?.Name;

            Directory.CreateDirectory(Path.Combine(extractionPath, "images"));
            newAsset.Path = Path.Combine(extractionPath, directoryName);

            await _context.SaveChangesAsync();

            return Ok();
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