using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AgroMind.GP.Repository.Data.Migrations
{
    /// <inheritdoc />
    public partial class recreateeStep : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "PictureUrl",
                table: "CropStage",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "TotalCost",
                table: "CropStage",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "description",
                table: "CropStage",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "Step",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    StepName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    cost = table.Column<int>(type: "int", nullable: true),
                    tool = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    description = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Duration = table.Column<DateTime>(type: "datetime2", nullable: true),
                    StageId = table.Column<int>(type: "int", nullable: true)
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
                name: "IX_Step_StageId",
                table: "Step",
                column: "StageId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Step");

            migrationBuilder.DropColumn(
                name: "PictureUrl",
                table: "CropStage");

            migrationBuilder.DropColumn(
                name: "TotalCost",
                table: "CropStage");

            migrationBuilder.DropColumn(
                name: "description",
                table: "CropStage");
        }
    }
}
