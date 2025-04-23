using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AgroMind.GP.Repository.Data.Migrations
{
    /// <inheritdoc />
    public partial class NewUpdates : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Duration",
                table: "Step");

            migrationBuilder.AddColumn<string>(
                name: "OptionalLink",
                table: "Crop",
                type: "nvarchar(max)",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "OptionalLink",
                table: "Crop");

            migrationBuilder.AddColumn<string>(
                name: "Duration",
                table: "Step",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }
    }
}
