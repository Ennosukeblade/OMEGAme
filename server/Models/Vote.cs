#pragma warning disable CS8618
using System.ComponentModel.DataAnnotations;
namespace server.Models;

public class Vote
{
    [Key]
    public int VoteId { get; set; }
    [Required]
    public int UserId { get; set; }
    public User? User { get; set; }
    [Required]
    public int GameId { get; set; } 
    public Game? VotesInGame { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.Now;
    public DateTime UpdatedAt { get; set; } = DateTime.Now;
}