using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AgroMind.GP.Repository.Data.Migrations
{
	/// <inheritdoc />
	public partial class AddCropStage : Migration
	{
		/// <inheritdoc />
		protected override void Up(MigrationBuilder migrationBuilder)
		{
			migrationBuilder.AlterColumn<string>(
				name: "CropDescription",
				table: "Crop",
				type: "nvarchar(max)",
				nullable: true,
				oldClrType: typeof(string),
				oldType: "nvarchar(max)");

			migrationBuilder.CreateTable(
				name: "CropStage",
				columns: table => new
				{
					Id = table.Column<int>(type: "int", nullable: false)
						.Annotation("SqlServer:Identity", "1, 1"),
					Stage = table.Column<string>(type: "nvarchar(max)", nullable: false),
					Duration = table.Column<int>(type: "int", nullable: false),
					Status = table.Column<string>(type: "nvarchar(max)", nullable: false),
					CropId = table.Column<int>(type: "int", nullable: true)
				},
				constraints: table =>
				{
					table.PrimaryKey("PK_CropStage", x => x.Id);
					table.ForeignKey(
						name: "FK_CropStage_Crop_CropId",
						column: x => x.CropId,
						principalTable: "Crop",
						principalColumn: "Id",
						onDelete: ReferentialAction.Restrict);
				});

			migrationBuilder.CreateIndex(
				name: "IX_CropStage_CropId",
				table: "CropStage",
				column: "CropId");
		}

		/// <inheritdoc />
		protected override void Down(MigrationBuilder migrationBuilder)
		{
			migrationBuilder.DropTable(
				name: "CropStage");

			migrationBuilder.AlterColumn<string>(
				name: "CropDescription",
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
