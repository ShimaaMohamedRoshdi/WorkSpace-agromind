using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AgroMind.GP.Repository.Data.Migrations
{
	/// <inheritdoc />
	public partial class AddLandRelationsWithFarmerAndCrop : Migration
	{
		/// <inheritdoc />
		protected override void Up(MigrationBuilder migrationBuilder)
		{
			migrationBuilder.DropForeignKey(
				name: "FK_Crop_Farmer_FarmerId",
				table: "Crop");

			migrationBuilder.AddColumn<int>(
				name: "LandId",
				table: "Crop",
				type: "int",
				nullable: true);

			migrationBuilder.CreateTable(
				name: "Land",
				columns: table => new
				{
					Id = table.Column<int>(type: "int", nullable: false)
						.Annotation("SqlServer:Identity", "1, 1"),
					Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
					Location = table.Column<string>(type: "nvarchar(max)", nullable: true),
					AreaSize = table.Column<double>(type: "float", nullable: true),
					unitOfMeasurement = table.Column<string>(type: "nvarchar(max)", nullable: true),
					SoilType = table.Column<string>(type: "nvarchar(max)", nullable: true),
					waterSource = table.Column<string>(type: "nvarchar(max)", nullable: true),
					type = table.Column<string>(type: "nvarchar(max)", nullable: true),
					PictureUrl = table.Column<string>(type: "nvarchar(max)", nullable: true),
					FarmerId = table.Column<string>(type: "nvarchar(450)", nullable: true),
					status = table.Column<string>(type: "nvarchar(max)", nullable: false),
					weatherCondition = table.Column<string>(type: "nvarchar(max)", nullable: false),
					currentCrop = table.Column<string>(type: "nvarchar(max)", nullable: false),
					isDeleted = table.Column<bool>(type: "bit", nullable: false),
					areaSizeInM2 = table.Column<double>(type: "float", nullable: false)
				},
				constraints: table =>
				{
					table.PrimaryKey("PK_Land", x => x.Id);
					table.ForeignKey(
						name: "FK_Land_Farmer_FarmerId",
						column: x => x.FarmerId,
						principalTable: "Farmer",
						principalColumn: "Id",
						onDelete: ReferentialAction.Restrict);
				});

			migrationBuilder.CreateIndex(
				name: "IX_Crop_LandId",
				table: "Crop",
				column: "LandId");

			migrationBuilder.CreateIndex(
				name: "IX_Land_FarmerId",
				table: "Land",
				column: "FarmerId");

			migrationBuilder.AddForeignKey(
				name: "FK_Crop_Farmer_FarmerId",
				table: "Crop",
				column: "FarmerId",
				principalTable: "Farmer",
				principalColumn: "Id",
				onDelete: ReferentialAction.Restrict);

			migrationBuilder.AddForeignKey(
				name: "FK_Crop_Land_LandId",
				table: "Crop",
				column: "LandId",
				principalTable: "Land",
				principalColumn: "Id",
				onDelete: ReferentialAction.Restrict);
		}

		/// <inheritdoc />
		protected override void Down(MigrationBuilder migrationBuilder)
		{
			migrationBuilder.DropForeignKey(
				name: "FK_Crop_Farmer_FarmerId",
				table: "Crop");

			migrationBuilder.DropForeignKey(
				name: "FK_Crop_Land_LandId",
				table: "Crop");

			migrationBuilder.DropTable(
				name: "Land");

			migrationBuilder.DropIndex(
				name: "IX_Crop_LandId",
				table: "Crop");

			migrationBuilder.DropColumn(
				name: "LandId",
				table: "Crop");

			migrationBuilder.AddForeignKey(
				name: "FK_Crop_Farmer_FarmerId",
				table: "Crop",
				column: "FarmerId",
				principalTable: "Farmer",
				principalColumn: "Id",
				onDelete: ReferentialAction.Cascade);
		}
	}
}
