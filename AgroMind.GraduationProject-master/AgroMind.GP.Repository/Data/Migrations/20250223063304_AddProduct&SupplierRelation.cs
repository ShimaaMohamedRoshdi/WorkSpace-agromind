using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AgroMind.GP.Repository.Data.Migrations
{
	/// <inheritdoc />
	public partial class AddProductSupplierRelation : Migration
	{
		/// <inheritdoc />
		protected override void Up(MigrationBuilder migrationBuilder)
		{
			migrationBuilder.AddColumn<string>(
				name: "SupplierId1",
				table: "Products",
				type: "nvarchar(450)",
				nullable: true);

			migrationBuilder.CreateIndex(
				name: "IX_Products_SupplierId1",
				table: "Products",
				column: "SupplierId1");

			migrationBuilder.AddForeignKey(
				name: "FK_Products_Supplier_SupplierId1",
				table: "Products",
				column: "SupplierId1",
				principalTable: "Supplier",
				principalColumn: "Id");
		}

		/// <inheritdoc />
		protected override void Down(MigrationBuilder migrationBuilder)
		{
			migrationBuilder.DropForeignKey(
				name: "FK_Products_Supplier_SupplierId1",
				table: "Products");

			migrationBuilder.DropIndex(
				name: "IX_Products_SupplierId1",
				table: "Products");

			migrationBuilder.DropColumn(
				name: "SupplierId1",
				table: "Products");
		}
	}
}
