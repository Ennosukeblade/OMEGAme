#pragma warning disable CS8618
using System.ComponentModel.DataAnnotations;
namespace server.Models;

public class AssetComment
{
    [Key]
    public int CommentId { get; set; }
    [Required]
    public int UserId { get; set; }
    public User? User { get; set; }
    [Required]
    public int AssetId { get; set; }
    public Asset? Game { get; set; }
    [Required]
    public string Content {get; set;}
    public DateTime CreatedAt { get; set; } = DateTime.Now;
    public DateTime UpdatedAt { get; set; } = DateTime.Now;
}