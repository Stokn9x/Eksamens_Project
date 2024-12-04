using Microsoft.EntityFrameworkCore;
using Manish_API.Model;
using Manish_API.Enum;

namespace Manish_API.Database
{
	public class AppDbContext : DbContext
	{
		public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
		{
		}

		public DbSet<Employee> Employees { get; set; }
		public DbSet<Shift> Shifts { get; set; }
		public DbSet<Product> Products { get; set; }
		public DbSet<Order> Orders { get; set; }
		public DbSet<Admin> Admins { get; set; }
		public DbSet<Customer> Customers { get; set; }
		public DbSet<FoodMenu> FoodMenus { get; set; }

		protected override void OnModelCreating(ModelBuilder modelBuilder)
		{
			base.OnModelCreating(modelBuilder);

			modelBuilder.Entity<Order>(entity =>
			{
				entity.HasKey(e => e.Id);
				entity.HasMany(e => e.Products);
				entity.HasOne(e => e.Customer);
			});

			modelBuilder.Entity<FoodMenu>().HasNoKey();
		}

		public void Seed()
		{
			if (!Admins.Any(a => a.Username == "admin"))
			{
				Admins.Add(new Admin
				{
					Id = Guid.NewGuid(),
					Username = "admin",
					Password = "admin"
				});
			}

			if (!Products.Any())
			{
				Products.AddRange(new List<Product>
				{
					new Product("Bruschetta", "ManishImage", "Grilled bread with tomatoes", new List<string> { "Bread", "Tomatoes", "Garlic" }, 5.0, 10, FoodCategory.Starters) { IsActive = true },
					new Product("Garlic Bread", "ManishImage", "Bread with garlic and butter", new List<string> { "Bread", "Garlic", "Butter" }, 4.0, 15, FoodCategory.Starters) { IsActive = true },
					new Product("Margherita Pizza", "ManishImage", "Classic pizza with tomatoes and cheese", new List<string> { "Dough", "Tomatoes", "Cheese" }, 10.0, 20, FoodCategory.MainCourse) { IsActive = true },
					new Product("Spaghetti Carbonara", "ManishImage", "Pasta with eggs, cheese, and bacon", new List<string> { "Pasta", "Eggs", "Cheese", "Bacon" }, 12.0, 25, FoodCategory.MainCourse) { IsActive = true },
					new Product("Tiramisu", "ManishImage", "Coffee-flavored Italian dessert", new List<string> { "Coffee", "Mascarpone", "Cocoa" }, 6.0, 30, FoodCategory.Deserts) { IsActive = false },
					new Product("Panna Cotta", "ManishImage", "Creamy dessert with berry sauce", new List<string> { "Cream", "Sugar", "Berries" }, 5.0, 35, FoodCategory.Deserts) { IsActive = false }
				});
			}

			SaveChanges();
		}
	}
}
