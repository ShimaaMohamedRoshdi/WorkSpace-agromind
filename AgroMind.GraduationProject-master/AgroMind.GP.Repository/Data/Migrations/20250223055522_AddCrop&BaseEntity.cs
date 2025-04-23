using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AgroMind.GP.Repository.Data.Migrations
{
	/// <inheritdoc />
	public partial class AddCropBaseEntity : Migration
	{
		/// <inheritdoc />
		protected override void Up(MigrationBuilder migrationBuilder)
		{
			migrationBuilder.CreateTable(
				name: "Crop",
				columns: table => new
				{
					Id = table.Column<int>(type: "int", nullable: false)
						.Annotation("SqlServer:Identity", "1, 1"),
					CropName = table.Column<string>(type: "nvarchar(max)", nullable: false),
					CropType = table.Column<string>(type: "nvarchar(max)", nullable: false),
					plantingDate = table.Column<DateTime>(type: "datetime2", nullable: false),
					LandPlantedType = table.Column<string>(type: "nvarchar(max)", nullable: false),
					AreaPlanted = table.Column<string>(type: "nvarchar(max)", nullable: false),
					CropHealthStatus = table.Column<string>(type: "nvarchar(max)", nullable: false),
					PictureUrl = table.Column<string>(type: "nvarchar(max)", nullable: false),
					FarmerId = table.Column<string>(type: "nvarchar(450)", nullable: true),
					CropDescription = table.Column<string>(type: "nvarchar(max)", nullable: false),
					FarmerId1 = table.Column<string>(type: "nvarchar(450)", nullable: true)
				},
				constraints: table =>
				{
					table.PrimaryKey("PK_Crop", x => x.Id);
					table.ForeignKey(
						name: "FK_Crop_Farmer_FarmerId",
						column: x => x.FarmerId,
						principalTable: "Farmer",
						principalColumn: "Id",
						onDelete: ReferentialAction.SetNull);
					table.ForeignKey(
						name: "FK_Crop_Farmer_FarmerId1",
						column: x => x.FarmerId1,
						principalTable: "Farmer",
						principalColumn: "Id");
				});

			migrationBuilder.CreateIndex(
				name: "IX_Crop_FarmerId",
				table: "Crop",
				column: "FarmerId");

			migrationBuilder.CreateIndex(
				name: "IX_Crop_FarmerId1",
				table: "Crop",
				column: "FarmerId1");
		}

		/// <inheritdoc />
		protected override void Down(MigrationBuilder migrationBuilder)
		{
			migrationBuilder.DropTable(
				name: "Crop");
		}
	}
}
