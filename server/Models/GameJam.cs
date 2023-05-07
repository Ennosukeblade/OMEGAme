#pragma warning disable CS8618
using System.ComponentModel.DataAnnotations;
namespace server.Models;
public class GameJam
{
    [Key]
    public int GameJamId { get; set; }
    [Required]
    public int UserId { get; set; }
    // Navigation Property : creator
    public User? Creator { get; set; }
    [Required]
    public string Title { get; set; }
    [Required]
    public string Description { get; set; }
    public DateTime StartDate { get; set; }
    public DateTime EndDate { get; set; }
    public DateTime VotingEndDate { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.Now;
    public DateTime UpdatedAt { get; set; } = DateTime.Now;

    // * GameJam have InGameJam 
    public List<InGameJam> MyInGameJams {get;set;} = new List<InGameJam>();
    // * Reward in GameJam
    public List<Reward> RewardInGameJam {get;set;} = new List<Reward>();

}