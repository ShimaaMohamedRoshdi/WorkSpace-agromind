using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AgroMind.GP.Repository.Data.Migrations
{
	/// <inheritdoc />
	public partial class editCrop : Migration
	{
		/// <inheritdoc />
		protected override void Up(MigrationBuilder migrationBuilder)
		{
			migrationBuilder.RenameColumn(
				name: "CropDescription",
				table: "Crop",
				newName: "Description");

			migrationBuilder.AlterColumn<DateTime>(
				name: "plantingDate",
				table: "Crop",
				type: "datetime2",
				nullable: true,
				oldClrType: typeof(DateTime),
				oldType: "datetime2");

			migrationBuilder.AlterColumn<string>(
				name: "LandPlantedType",
				table: "Crop",
				type: "nvarchar(max)",
				nullable: true,
				oldClrType: typeof(string),
				oldType: "nvarchar(max)");

			migrationBuilder.AlterColumn<string>(
				name: "CropType",
				table: "Crop",
				type: "nvarchar(max)",
				nullable: true,
				oldClrType: typeof(string),
				oldType: "nvarchar(max)");

			migrationBuilder.AlterColumn<string>(
				name: "CropHealthStatus",
				table: "Crop",
				type: "nvarchar(max)",
				nullable: true,
				oldClrType: typeof(string),
				oldType: "nvarchar(max)");

			migrationBuilder.AlterColumn<string>(
				name: "AreaPlanted",
				table: "Crop",
				type: "nvarchar(max)",
				nullable: true,
				oldClrType: typeof(string),
				oldType: "nvarchar(max)");
		}

		/// <inheritdoc />
		protected override void Down(MigrationBuilder migrationBuilder)
		{
			migrationBuilder.RenameColumn(
				name: "Description",
				table: "Crop",
				newName: "CropDescription");

			migrationBuilder.AlterColumn<DateTime>(
				name: "plantingDate",
				table: "Crop",
				type: "datetime2",
				nullable: false,
				defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified),
				oldClrType: typeof(DateTime),
				oldType: "datetime2",
				oldNullable: true);

			migrationBuilder.AlterColumn<string>(
				name: "LandPlantedType",
				table: "Crop",
				type: "nvarchar(max)",
				nullable: false,
				defaultValue: "",
				oldClrType: typeof(string),
				oldType: "nvarchar(max)",
				oldNullable: true);

			migrationBuilder.AlterColumn<string>(
				name: "CropType",
				table: "Crop",
				type: "nvarchar(max)",
				nullable: false,
				defaultValue: "",
				oldClrType: typeof(string),
				oldType: "nvarchar(max)",
				oldNullable: true);

			migrationBuilder.AlterColumn<string>(
				name: "CropHealthStatus",
				table: "Crop",
				type: "nvarchar(max)",
				nullable: false,
				defaultValue: "",
				oldClrType: typeof(string),
				oldType: "nvarchar(max)",
				oldNullable: true);

			migrationBuilder.AlterColumn<string>(
				name: "AreaPlanted",
				table: "Crop",
				type: "nvarchar(max)",
				nullable: false,
				defaultValue: "",
				oldClrType: typeof(string),
				oldType: "nvarchar(max)",
				oldNullable: true);
		}
	}
}
