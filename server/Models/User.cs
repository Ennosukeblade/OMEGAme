#pragma warning disable CS8618
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace server.Models;
public class User
{
    // ---------------------ID--------------------------
    [Key]
    public int UserId { get; set; }
    
    // ---------------------FirstName------------------------------------
    [Required(ErrorMessage ="FirstName is required !!!!!!!")]
    [MinLength(2, ErrorMessage ="FirstName must be at least 2 ❌❌❌")]
    public string FirstName { get; set; } 
    // ---------------------LastName------------------------------------
    [Required(ErrorMessage ="LastName is required !!!!!!!")]
    [MinLength(2, ErrorMessage ="LastName must be at least 2 ❌❌❌")]
    public string LastName { get; set; } 

    // ------------------------Email---------------------------------
    [Required(ErrorMessage ="Email address must be present 😡😡😡")]
    [EmailAddress] // Email Pattern (= REGEX)
    public string Email { get; set; }

    // --------------------------Password----------------------------
    [Required(ErrorMessage ="Password is very required")]
    [MinLength(6,ErrorMessage ="Password must be > than 6")]
    [DataType(DataType.Password)] // To hide the password Input in The Views
    public string Password { get; set; }

    // -----------------------Confirm Password---------------------------------
    [NotMapped] // Do not add this field to DB
    [Compare("Password", ErrorMessage ="Password & Confirm Password must match")]
    [DataType(DataType.Password)] // To hide the Confirm password Input  in The Views
    [Display(Name ="Confirm Password")]
    public string Confirm { get; set; }

    // -----------------------Created At--------------------------------
    public DateTime CreatedAt { get; set; } = DateTime.Now;

    // ----------------------------Updated At-------------------------------
    public DateTime UpdatedAt { get; set; } = DateTime.Now;
    // * User Have Comments 
    public List<Comment> MyComments {get;set;} = new List<Comment>();
    // * User Have Asset Comments 
    public List<AssetComment> MyAssetComments {get;set;} = new List<AssetComment>();
    // * User Have Games 
    public List<Game> MyGames {get;set;} = new List<Game>();
    // * User Have Rewards 
    public List<Reward> MyRewards {get;set;} = new List<Reward>();
    // * User Have Game Jams 
    public List<GameJam> MyGameJams {get;set;} = new List<GameJam>();
    // * User Have Votes 
    public List<Vote> MyVotes {get;set;} = new List<Vote>();
}
