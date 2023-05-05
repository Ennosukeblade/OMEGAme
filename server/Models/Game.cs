#pragma warning disable CS8618
using System.ComponentModel.DataAnnotations;
namespace server.Models;
public class Game
{
    [Key]
    public int GameId { get; set; }
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
}
