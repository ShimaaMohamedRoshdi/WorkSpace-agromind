using AgroMind.GP.Core.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace AgroMind.GP.Repository.Data.Configurations
{
	public class LandConfigurations : IEntityTypeConfiguration<Land>
	{
		public void Configure(EntityTypeBuilder<Land> builder)
		{
			builder.HasOne(L => L.Farmer)
				.WithMany(f => f.Lands)
				.HasForeignKey(l => l.FarmerId)
				.OnDelete(DeleteBehavior.Restrict);
			//OnDelete(DeleteBehavior.Cascade);  // If Farmer is deleted, delete Lands

			builder.Property(e => e.Latitude).HasColumnType("float");
			builder.Property(e => e.Longitude).HasColumnType("float");
		}
	}
}
