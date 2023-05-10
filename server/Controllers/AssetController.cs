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
        [HttpPost]
        public async Task<ActionResult<Game>> CreateGame(Game NewGame)
        {
            _context.Games.Add(NewGame);
            await _context.SaveChangesAsync();
            return StatusCode(200,CreatedAtAction(nameof(Game), new { id = NewGame.GameId }, NewGame));
        }
        // //* POST: api/Game
        [HttpPost("upload/{id}")]
        public async Task<IActionResult> UploadFile(IFormFile file, int id)
        {
            Game? newGame = await _context.Games.FindAsync(id);

            if (file == null || file.Length == 0)
            {
                return BadRequest("Please provide a file");
            }

            // Uncompress the file
            using var stream = new MemoryStream();
            await file.CopyToAsync(stream);
            var fileName = Path.GetFileNameWithoutExtension(file.FileName);
            using var archive = new ZipArchive(stream);
            var extractionPath = Path.Combine("E:/OMEGAme/server/wwwroot", "uploads");
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
            newGame.Path = newPath;
            // Find the index.html file
            var indexHtmlPath = Path.Combine(newPath, "index.html");
            if (indexHtmlPath != null)
            {
                newGame.isPlayable = true;
            }
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