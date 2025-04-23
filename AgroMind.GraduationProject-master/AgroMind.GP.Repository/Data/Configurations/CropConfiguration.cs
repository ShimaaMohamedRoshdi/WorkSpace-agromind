using AgroMind.GP.Core.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace AgroMind.GP.Repository.Data.Configurations
{
	public class CropConfiguration : IEntityTypeConfiguration<Crop>
	{
		public void Configure(EntityTypeBuilder<Crop> builder)
		{
			builder.HasOne(c => c.Farmer)
				   .WithMany(f => f.Crops)
				   .HasForeignKey(c => c.FarmerId)
				   .OnDelete(DeleteBehavior.Restrict);  // If Farmer is deleted, keep Crops

			builder.HasOne(c => c.Land)
				.WithMany(l => l.Crops)
				.HasForeignKey(c => c.LandId)
				.OnDelete(DeleteBehavior.Restrict);
			// .OnDelete(DeleteBehavior.Cascade);  // If Land is deleted, delete Crops
			builder.Property(c => c.TotalCost)
			   .HasColumnType("decimal(18,2)"); // Ensure precision

		}
	}
}
