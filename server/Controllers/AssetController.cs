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
            return StatusCode(200,CreatedAtAction(nameof(Asset), new { id = NewAsset.AssetId }, NewAsset));
        }
        // //* POST: api/Game
        [HttpPost("upload/{id}")]
        public async Task<IActionResult> UploadFile(IFormFile file, int id)
        {
            Asset? newAsset = await _context.Assets.FindAsync(id);

            if (file == null || file.Length == 0)
            {
                return BadRequest("Please provide a file");
            }

            // Uncompress the file
            using var stream = new MemoryStream();
            await file.CopyToAsync(stream);
            var fileName = Path.GetFileNameWithoutExtension(file.FileName);
            using var archive = new ZipArchive(stream);
            var extractionPath = Path.Combine(_hostingEnvironment.WebRootPath, "ModelAssets");
            archive.ExtractToDirectory(extractionPath);
            var directoryName = new DirectoryInfo(extractionPath).GetDirectories().LastOrDefault()?.Name;

            // Rename the folder
            var folderName = $"{id}";
            var oldPath = Path.Combine(extractionPath, directoryName);
            FileSystem.RenameDirectory(oldPath, folderName);
            System.Console.WriteLine(oldPath);

            //* Update Game
            var newPath = Path.Combine(extractionPath, folderName);
            Directory.CreateDirectory(Path.Combine(newPath,"images"));
            newAsset.Path = newPath;
            // Find the index.html file
            await _context.SaveChangesAsync();
            return Ok();
            //* return File(System.IO.File.ReadAllBytes(indexHtmlPath), "text/html");
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