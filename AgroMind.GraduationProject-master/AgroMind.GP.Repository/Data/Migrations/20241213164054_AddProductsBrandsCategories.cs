using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AgroMind.GP.Repository.Data.Migrations
{
	/// <inheritdoc />
	public partial class AddProductsBrandsCategories : Migration
	{
		/// <inheritdoc />
		protected override void Up(MigrationBuilder migrationBuilder)
		{
			migrationBuilder.CreateTable(
				name: "Brands",
				columns: table => new
				{
					Id = table.Column<int>(type: "int", nullable: false)
						.Annotation("SqlServer:Identity", "1, 1"),
					Name = table.Column<string>(type: "nvarchar(max)", nullable: false)
				},
				constraints: table =>
				{
					table.PrimaryKey("PK_Brands", x => x.Id);
				});

			migrationBuilder.CreateTable(
				name: "Categories",
				columns: table => new
				{
					Id = table.Column<int>(type: "int", nullable: false)
						.Annotation("SqlServer:Identity", "1, 1"),
					Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
					imageUrl = table.Column<string>(type: "nvarchar(max)", nullable: false)
				},
				constraints: table =>
				{
					table.PrimaryKey("PK_Categories", x => x.Id);
				});

			migrationBuilder.CreateTable(
				name: "Products",
				columns: table => new
				{
					Id = table.Column<int>(type: "int", nullable: false)
						.Annotation("SqlServer:Identity", "1, 1"),
					Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
					Description = table.Column<string>(type: "nvarchar(max)", nullable: true),
					PictureUrl = table.Column<string>(type: "nvarchar(max)", nullable: false),
					Price = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
					discount = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
					CategoryId = table.Column<int>(type: "int", nullable: true),
					BrandId = table.Column<int>(type: "int", nullable: true),
					StockQuantity = table.Column<int>(type: "int", nullable: false)
				},
				constraints: table =>
				{
					table.PrimaryKey("PK_Products", x => x.Id);
					table.ForeignKey(
						name: "FK_Products_Brands_BrandId",
						column: x => x.BrandId,
						principalTable: "Brands",
						principalColumn: "Id",
						onDelete: ReferentialAction.SetNull);
					table.ForeignKey(
						name: "FK_Products_Categories_CategoryId",
						column: x => x.CategoryId,
						principalTable: "Categories",
						principalColumn: "Id",
						onDelete: ReferentialAction.SetNull);
				});

			migrationBuilder.CreateIndex(
				name: "IX_Products_BrandId",
				table: "Products",
				column: "BrandId");

			migrationBuilder.CreateIndex(
				name: "IX_Products_CategoryId",
				table: "Products",
				column: "CategoryId");
		}

		/// <inheritdoc />
		protected override void Down(MigrationBuilder migrationBuilder)
		{
			migrationBuilder.DropTable(
				name: "Products");

			migrationBuilder.DropTable(
				name: "Brands");

			migrationBuilder.DropTable(
				name: "Categories");
		}
	}
}
