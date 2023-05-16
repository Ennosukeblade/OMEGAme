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
    public string Image {get; set;}
    public DateOnly StartDate { get; set; }
    public DateOnly EndDate { get; set; }
    public DateOnly VotingEndDate { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.Now;
    public DateTime UpdatedAt { get; set; } = DateTime.Now;

    // * GameJam have InGameJam 
    public List<Game> MyInGames {get;set;} = new List<Game>();
    // * Reward in GameJam
    public List<Reward> RewardInGameJam {get;set;} = new List<Reward>();

}