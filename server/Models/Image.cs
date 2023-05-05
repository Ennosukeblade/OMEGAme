#pragma warning disable CS8618
using System.ComponentModel.DataAnnotations;
namespace server.Models;
public class Image
{
    [Key]
    public int ImageId { get; set; }
    [Required]
    public int GameId { get; set; }
    // Navigation Property : creator
    public Game? Game { get; set; }
    [Required]
    public string FileName { get; set; }

    public DateTime CreatedAt { get; set; } = DateTime.Now;
    public DateTime UpdatedAt { get; set; } = DateTime.Now;
}
