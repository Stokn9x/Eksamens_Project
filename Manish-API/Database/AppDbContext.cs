using Microsoft.EntityFrameworkCore;
using Manish_API.Model;

namespace Manish_API.Database
{
	public class AppDbContext : DbContext
	{
		public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
		{
		}

		public	DbSet<Employee> Employees { get; set; }
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
	}
}
