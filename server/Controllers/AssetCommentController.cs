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
    public class AssetCommentController : ControllerBase
    {
        private readonly MyContext _context;

        public AssetCommentController(MyContext context)
        {
            _context = context;
        }
        //* GET: api/AssetComment
        [HttpGet]
        public async Task<ActionResult<IEnumerable<AssetComment>>> GetAllAssetComments()
        {
            return await _context.AssetComments.ToListAsync();
        }
        //* GET: api/AssetComment/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<AssetComment>> GetAssetCommentById(int id)
        {
            var assetComment = await _context.AssetComments.FindAsync(id);
            if (assetComment == null)
            {
                return NotFound();
            }
            return assetComment;
        }
        //* POST: api/AssetComment
        [HttpPost]
        public async Task<ActionResult<AssetComment>> CreateAssetComment(AssetComment NewAssetComment)
        {
            _context.AssetComments.Add(NewAssetComment);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(AssetComment), new { id = NewAssetComment.AssetCommentId }, NewAssetComment);
        }
    }
}