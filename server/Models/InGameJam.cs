#pragma warning disable CS8618
using System.ComponentModel.DataAnnotations;
namespace server.Models;

public class InGameJam
{
    [Key]
    public int InGameJamId { get; set; }
    [Required]
    public int GameId { get; set; }
    public Game? Game { get; set; }
    [Required]
    public int GameJamId { get; set; }
    public GameJam? GameJam { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.Now;
    public DateTime UpdatedAt { get; set; } = DateTime.Now;

    // * Votes in InGameJams
    public List<Vote> MyVotes {get;set;} = new List<Vote>();
}