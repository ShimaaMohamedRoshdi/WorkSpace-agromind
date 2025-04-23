using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AgroMind.GP.Repository.Data.Migrations
{
	/// <inheritdoc />
	public partial class UpdateRemoveCrop : Migration
	{
		/// <inheritdoc />
		protected override void Up(MigrationBuilder migrationBuilder)
		{
			migrationBuilder.DropForeignKey(
				name: "FK_Products_Category_CategoryId",
				table: "Products");

			migrationBuilder.DropTable(
				name: "Crop");

			migrationBuilder.DropPrimaryKey(
				name: "PK_Category",
				table: "Category");

			migrationBuilder.RenameTable(
				name: "Category",
				newName: "Categories");

			migrationBuilder.AddPrimaryKey(
				name: "PK_Categories",
				table: "Categories",
				column: "Id");

			migrationBuilder.AddForeignKey(
				name: "FK_Products_Categories_CategoryId",
				table: "Products",
				column: "CategoryId",
				principalTable: "Categories",
				principalColumn: "Id",
				onDelete: ReferentialAction.SetNull);
		}

		/// <inheritdoc />
		protected override void Down(MigrationBuilder migrationBuilder)
		{
			migrationBuilder.DropForeignKey(
				name: "FK_Products_Categories_CategoryId",
				table: "Products");

			migrationBuilder.DropPrimaryKey(
				name: "PK_Categories",
				table: "Categories");

			migrationBuilder.RenameTable(
				name: "Categories",
				newName: "Category");

			migrationBuilder.AddPrimaryKey(
				name: "PK_Category",
				table: "Category",
				column: "Id");

			migrationBuilder.CreateTable(
				name: "Crop",
				columns: table => new
				{
					Id = table.Column<int>(type: "int", nullable: false)
						.Annotation("SqlServer:Identity", "1, 1"),
					FarmerId = table.Column<string>(type: "nvarchar(450)", nullable: true),
					AreaPlanted = table.Column<string>(type: "nvarchar(max)", nullable: false),
					CropDescription = table.Column<string>(type: "nvarchar(max)", nullable: false),
					CropHealthStatus = table.Column<string>(type: "nvarchar(max)", nullable: false),
					CropName = table.Column<string>(type: "nvarchar(max)", nullable: false),
					CropType = table.Column<string>(type: "nvarchar(max)", nullable: false),
					LandPlantedType = table.Column<string>(type: "nvarchar(max)", nullable: false),
					PictureUrl = table.Column<string>(type: "nvarchar(max)", nullable: false),
					plantingDate = table.Column<DateTime>(type: "datetime2", nullable: false)
				},
				constraints: table =>
				{
					table.PrimaryKey("PK_Crop", x => x.Id);
					table.ForeignKey(
						name: "FK_Crop_Farmer_FarmerId",
						column: x => x.FarmerId,
						principalTable: "Farmer",
						principalColumn: "Id",
						onDelete: ReferentialAction.Cascade);
				});

			migrationBuilder.CreateIndex(
				name: "IX_Crop_FarmerId",
				table: "Crop",
				column: "FarmerId");

			migrationBuilder.AddForeignKey(
				name: "FK_Products_Category_CategoryId",
				table: "Products",
				column: "CategoryId",
				principalTable: "Category",
				principalColumn: "Id",
				onDelete: ReferentialAction.SetNull);
		}
	}
}
