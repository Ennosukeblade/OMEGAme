#pragma warning disable CS8618
/* 
Disabled Warning: "Non-nullable field must contain a non-null value when exiting constructor. Consider declaring as nullable."
We can disable this safely because we know the framework will assign non-null values when it constructs this class for us.
*/
using Microsoft.EntityFrameworkCore;
namespace server.Models;
// the MyContext class representing a session with our MySQL database, allowing us to query for or save data
public class MyContext : DbContext
{
    public MyContext(DbContextOptions options) : base(options) { }
    // the "Monsters" table name will come from the DbSet property name
    public DbSet<Asset> Assets { get; set; }
    public DbSet<AssetComment> AssetComments { get; set; }
    public DbSet<AssetImage> AssetImages { get; set; }
    public DbSet<Comment> Comments { get; set; }
    public DbSet<Game> Games { get; set; }
    public DbSet<GameJam> GameJams { get; set; }
    public DbSet<Image> Images { get; set; }
    public DbSet<InGameJam> InGameJams { get; set; }
    public DbSet<Reward> Rewards { get; set; }
    public DbSet<User> Users { get; set; }
    public DbSet<Vote> Votes { get; set; }
}
