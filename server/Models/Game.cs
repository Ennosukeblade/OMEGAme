#pragma warning disable CS8618
using System.ComponentModel.DataAnnotations;
namespace server.Models;
public class Game
{
    [Key]
    public int GameId { get; set; }
    [Required]
    public int UserId { get; set; }
    // Navigation Property : creator
    public User? Creator { get; set; }
    public int? GameJamId { get; set; }
    // Navigation Property : creator
    public GameJam? InGameJam { get; set; }

    [Required]
    public string Title { get; set; }
    [Required]
    public string Genre { get; set; }
    public string Path { get; set; } 
    [Required]
    [Range(0.00,int.MaxValue)]
    public double Price { get; set; } = 0.0;
    [Required]
    public string Description { get; set; }
    public bool isPlayable { get; set; }=false;

    public DateTime CreatedAt { get; set; } = DateTime.Now;
    public DateTime UpdatedAt { get; set; } = DateTime.Now;
    // * Comments In Game 
    public List<Comment> InGameComments {get;set;} = new List<Comment>();

    // *  Game Have images
    public List<Image> MyImages {get;set;} = new List<Image>();
    // *  Game Have images
    public List<Vote> GameVotes {get;set;} = new List<Vote>();

}