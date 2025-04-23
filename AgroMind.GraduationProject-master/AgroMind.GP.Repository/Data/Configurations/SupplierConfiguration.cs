using AgroMind.GP.Core.Entities.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace AgroMind.GP.Repository.Data.Configurations
{
	public class SupplierConfiguration : IEntityTypeConfiguration<Supplier>
	{
		public void Configure(EntityTypeBuilder<Supplier> builder)
		{

		}
	}
}
