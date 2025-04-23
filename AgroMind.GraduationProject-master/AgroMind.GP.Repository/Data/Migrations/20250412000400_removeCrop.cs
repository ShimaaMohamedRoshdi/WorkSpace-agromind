using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AgroMind.GP.Repository.Data.Migrations
{
    /// <inheritdoc />
    public partial class removeCrop : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Step");

            migrationBuilder.DropTable(
                name: "CropStage");

            migrationBuilder.DropTable(
                name: "Crop");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Crop",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    FarmerId = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    LandId = table.Column<int>(type: "int", nullable: true),
                    AreaPlanted = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CropHealthStatus = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CropName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CropType = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    LandPlantedType = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PictureUrl = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    plantingDate = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Crop", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Crop_Farmer_FarmerId",
                        column: x => x.FarmerId,
                        principalTable: "Farmer",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Crop_Land_LandId",
                        column: x => x.LandId,
                        principalTable: "Land",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "CropStage",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CropId = table.Column<int>(type: "int", nullable: true),
                    Duration = table.Column<int>(type: "int", nullable: true),
                    PictureUrl = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Stage = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Status = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    TotalCost = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    description = table.Column<string>(type: "nvarchar(max)", nullable: true)
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

            migrationBuilder.CreateTable(
                name: "Step",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    StageId = table.Column<int>(type: "int", nullable: true),
                    Duration = table.Column<DateTime>(type: "datetime2", nullable: true),
                    StepName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    cost = table.Column<int>(type: "int", nullable: true),
                    description = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    tool = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Step", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Step_CropStage_StageId",
                        column: x => x.StageId,
                        principalTable: "CropStage",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Crop_FarmerId",
                table: "Crop",
                column: "FarmerId");

            migrationBuilder.CreateIndex(
                name: "IX_Crop_LandId",
                table: "Crop",
                column: "LandId");

            migrationBuilder.CreateIndex(
                name: "IX_CropStage_CropId",
                table: "CropStage",
                column: "CropId");

            migrationBuilder.CreateIndex(
                name: "IX_Step_StageId",
                table: "Step",
                column: "StageId");
        }
    }
}
