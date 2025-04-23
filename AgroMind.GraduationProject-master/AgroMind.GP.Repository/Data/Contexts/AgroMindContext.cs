using AgroMind.GP.Core.Entities;
using AgroMind.GP.Core.Entities.Identity;
using AgroMind.GP.Core.Entities.ProductModule;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using System.Reflection;

namespace AgroMind.GP.Repository.Data.Contexts
{
	public class AgroMindContext : IdentityDbContext<AppUser>
	{
		public AgroMindContext(DbContextOptions<AgroMindContext> options) : base(options)
		{
		}

		protected override void OnModelCreating(ModelBuilder modelBuilder)
		{
			//modelBuilder.ApplyConfiguration(new ProductConfigration()); // for one class configuration
			modelBuilder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());//will aplly of all configurations Classes That implement IEntityTypeConfigurations

			//Identity Default Configurations
			base.OnModelCreating(modelBuilder);

			//fluent api

			// Apply Table-Per-Type (TPT)
			modelBuilder.Entity<Farmer>().ToTable(nameof(Farmer));
			modelBuilder.Entity<AgriculturalExpert>().ToTable(nameof(AgriculturalExpert));
			modelBuilder.Entity<SystemAdministrator>().ToTable(nameof(SystemAdministrator));
			modelBuilder.Entity<Supplier>().ToTable(nameof(Supplier));

			// Handle AvailableHours (TimeSpan List → Stored as a string in SQL)
			var timeSpanConverter = new ValueConverter<List<TimeSpan>, string>(
				v => string.Join(',', v.Select(ts => ts.ToString())),  // Convert List<TimeSpan> -> string
				v => v.Split(',', StringSplitOptions.RemoveEmptyEntries)
					  .Select(TimeSpan.Parse)
					  .ToList() // Convert string -> List<TimeSpan>
			);

			var timeSpanComparer = new ValueComparer<List<TimeSpan>>(
				(c1, c2) => c1.SequenceEqual(c2),  // Compare lists
				c => c.Aggregate(0, (a, v) => HashCode.Combine(a, v.GetHashCode())), // HashCode
				c => c.ToList()  // Snapshot copy
			);

			modelBuilder.Entity<AgriculturalExpert>()
				.Property(e => e.AvailableHours)
				.HasConversion(timeSpanConverter)
				.Metadata.SetValueComparer(timeSpanComparer);
		}



		public DbSet<Address> Addresss { get; set; }
		public DbSet<Farmer> Farmers { get; set; }
		public DbSet<AgriculturalExpert> AgriculturalExperts { get; set; }
		public DbSet<SystemAdministrator> SystemAdministrators { get; set; }
		public DbSet<Supplier> Suppliers { get; set; }

		public DbSet<Brand> Brands { get; set; }

		public DbSet<Product> Products { get; set; }

		public DbSet<Category> Categories { get; set; }

		public DbSet<Crop> Crop { get; set; }
		public DbSet<CropStage> CropStage { get; set; }

		public DbSet<Step> Step { get; set; }

		public DbSet<Land> Land { get; set; }



	}
}
