using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AgroMind.GP.Repository.Data.Migrations
{
	/// <inheritdoc />
	public partial class CropfarmerRelation : Migration
	{
		/// <inheritdoc />
		protected override void Up(MigrationBuilder migrationBuilder)
		{
			migrationBuilder.DropForeignKey(
				name: "FK_Crop_Farmer_FarmerId",
				table: "Crop");

			migrationBuilder.AlterColumn<string>(
				name: "FarmerId",
				table: "Crop",
				type: "nvarchar(450)",
				nullable: false,
				defaultValue: "",
				oldClrType: typeof(string),
				oldType: "nvarchar(450)",
				oldNullable: true);

			migrationBuilder.AddForeignKey(
				name: "FK_Crop_Farmer_FarmerId",
				table: "Crop",
				column: "FarmerId",
				principalTable: "Farmer",
				principalColumn: "Id",
				onDelete: ReferentialAction.Cascade);
		}

		/// <inheritdoc />
		protected override void Down(MigrationBuilder migrationBuilder)
		{
			migrationBuilder.DropForeignKey(
				name: "FK_Crop_Farmer_FarmerId",
				table: "Crop");

			migrationBuilder.AlterColumn<string>(
				name: "FarmerId",
				table: "Crop",
				type: "nvarchar(450)",
				nullable: true,
				oldClrType: typeof(string),
				oldType: "nvarchar(450)");

			migrationBuilder.AddForeignKey(
				name: "FK_Crop_Farmer_FarmerId",
				table: "Crop",
				column: "FarmerId",
				principalTable: "Farmer",
				principalColumn: "Id",
				onDelete: ReferentialAction.SetNull);
		}
	}
}
