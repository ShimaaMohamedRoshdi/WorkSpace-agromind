using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AgroMind.GP.Repository.Data.Migrations
{
	/// <inheritdoc />
	public partial class AddCropFarmerRelation2 : Migration
	{
		/// <inheritdoc />
		protected override void Up(MigrationBuilder migrationBuilder)
		{
			migrationBuilder.DropForeignKey(
				name: "FK_Crop_Farmer_FarmerId1",
				table: "Crop");

			migrationBuilder.DropIndex(
				name: "IX_Crop_FarmerId1",
				table: "Crop");

			migrationBuilder.DropColumn(
				name: "FarmerId1",
				table: "Crop");
		}

		/// <inheritdoc />
		protected override void Down(MigrationBuilder migrationBuilder)
		{
			migrationBuilder.AddColumn<string>(
				name: "FarmerId1",
				table: "Crop",
				type: "nvarchar(450)",
				nullable: true);

			migrationBuilder.CreateIndex(
				name: "IX_Crop_FarmerId1",
				table: "Crop",
				column: "FarmerId1");

			migrationBuilder.AddForeignKey(
				name: "FK_Crop_Farmer_FarmerId1",
				table: "Crop",
				column: "FarmerId1",
				principalTable: "Farmer",
				principalColumn: "Id");
		}
	}
}
