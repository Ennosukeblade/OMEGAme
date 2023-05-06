#pragma warning disable CS8618
using System.ComponentModel.DataAnnotations;
namespace server.Models;
public class Asset
{
    [Key]
    public int AssetId { get; set; }
    [Required]
    public int UserId { get; set; }
    // Navigation Property : creator
    public User? Creator { get; set; }
    [Required]
    public string Title { get; set; }
    public string Genre { get; set; }
    public string Path { get; set; }
    [Required]
    public double Price { get; set; } = 0.0;
    [Required]
    public string Description { get; set; }

    public DateTime CreatedAt { get; set; } = DateTime.Now;
    public DateTime UpdatedAt { get; set; } = DateTime.Now;
    // * Comments In Asset 
    public List<AssetComment> MyComments {get;set;} = new List<AssetComment>();
    // * Assets have Images
    public List<AssetImage> AssetImages {get;set;} = new List<AssetImage>();
}
