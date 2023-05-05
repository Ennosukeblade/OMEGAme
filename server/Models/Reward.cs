#pragma warning disable CS8618
using System.ComponentModel.DataAnnotations;
namespace server.Models;
public class Reward
{
    [Key]
    public int RewardId { get; set; }
    [Required]
    public int UserId { get; set; }
    // Navigation Property : creator
    public User? Creator { get; set; }
    [Required]
    public string RewardPrice { get; set; }

    public DateTime CreatedAt { get; set; } = DateTime.Now;
    public DateTime UpdatedAt { get; set; } = DateTime.Now;
}
