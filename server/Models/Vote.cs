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
    public int InGameJamId { get; set; }
    public InGameJam? InGameJam { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.Now;
    public DateTime UpdatedAt { get; set; } = DateTime.Now;
}