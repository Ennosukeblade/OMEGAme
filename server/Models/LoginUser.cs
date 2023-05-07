#pragma warning disable CS8618
using System.ComponentModel.DataAnnotations;
namespace server.Models;
public class LoginUser
{

    // ------------------------Email---------------------------------
    [Required(ErrorMessage ="Email address must be present 😡😡😡")]
    [EmailAddress] // Email Pattern (= REGEX)
    public string LoginEmail { get; set; }

    // --------------------------Password----------------------------
    [Required(ErrorMessage ="Password is very required")]
    [MinLength(6,ErrorMessage ="Password must be > than 6")]
    [DataType(DataType.Password)] // To hide the password Input in The Views
    public string LoginPassword { get; set; }

}
