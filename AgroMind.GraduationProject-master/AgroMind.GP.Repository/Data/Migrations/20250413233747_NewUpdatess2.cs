using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AgroMind.GP.Repository.Data.Migrations
{
    /// <inheritdoc />
    public partial class NewUpdatess2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "OptionalLink",
                table: "Crop");

            migrationBuilder.AddColumn<string>(
                name: "OptionalLink",
                table: "CropStage",
                type: "nvarchar(max)",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "OptionalLink",
                table: "CropStage");

            migrationBuilder.AddColumn<string>(
                name: "OptionalLink",
                table: "Crop",
                type: "nvarchar(max)",
                nullable: true);
        }
    }
}
