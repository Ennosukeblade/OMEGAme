#pragma warning disable CS8618
using System.ComponentModel.DataAnnotations;
namespace server.Models;
public class AssetImage
{
    [Key]
    public int AssetImageId { get; set; }
    [Required]
    public int AssetId { get; set; }
    // Navigation Property : creator
    public Asset? Asset { get; set; } 
    [Required]
    public string FileName { get; set; }

    public DateTime CreatedAt { get; set; } = DateTime.Now;
    public DateTime UpdatedAt { get; set; } = DateTime.Now;
}
