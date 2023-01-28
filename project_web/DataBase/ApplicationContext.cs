using project_web.Models;
using Microsoft.EntityFrameworkCore;

namespace project_web.DataBase;

public class ApplicationContext : DbContext
{
    public DbSet<User> Users { get; set; } = null!;
    public DbSet<UserProfile> UsersProfile { get; set; } = null!;
    public DbSet<Pair> Pairs { get; set; } = null!;
    public ApplicationContext(DbContextOptions<ApplicationContext> contextOptions) : base(contextOptions)
    {
    // Database.EnsureDeleted();
    Database.EnsureCreated();
    }
}
