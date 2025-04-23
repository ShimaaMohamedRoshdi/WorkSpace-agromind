using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AgroMind.GP.Repository.Data.Migrations
{
    /// <inheritdoc />
    public partial class updatesds : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Description",
                table: "Step",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "OptionalLink",
                table: "Crop",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<decimal>(
                name: "TotalCost",
                table: "Crop",
                type: "decimal(18,2)",
                nullable: false,
                defaultValue: 0m);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Description",
                table: "Step");

            migrationBuilder.DropColumn(
                name: "OptionalLink",
                table: "Crop");

            migrationBuilder.DropColumn(
                name: "TotalCost",
                table: "Crop");
        }
    }
}
