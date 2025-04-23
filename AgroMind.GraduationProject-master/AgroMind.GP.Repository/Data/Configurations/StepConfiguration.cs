using AgroMind.GP.Core.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AgroMind.GP.Repository.Data.Configurations
{
	public class StepConfiguration : IEntityTypeConfiguration<Step>
	{
		public void Configure(EntityTypeBuilder<Step> builder)
		{
			builder.HasOne(s => s.Stage)
		  .WithMany(cs => cs.Steps)
		  .HasForeignKey(s => s.StageId)
		  .OnDelete(DeleteBehavior.Restrict);

			builder.Property(s => s.Cost)
			  .HasColumnType("decimal(18,2)"); // Ensure precision

		}
	}
}
