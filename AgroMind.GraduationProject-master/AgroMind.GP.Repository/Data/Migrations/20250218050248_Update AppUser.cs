using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AgroMind.GP.Repository.Data.Migrations
{
	/// <inheritdoc />
	public partial class UpdateAppUser : Migration
	{
		/// <inheritdoc />
		protected override void Up(MigrationBuilder migrationBuilder)
		{
			migrationBuilder.DropColumn(
				name: "confirmpassword",
				table: "AspNetUsers");

			migrationBuilder.DropColumn(
				name: "password",
				table: "AspNetUsers");
		}

		/// <inheritdoc />
		protected override void Down(MigrationBuilder migrationBuilder)
		{
			migrationBuilder.AddColumn<string>(
				name: "confirmpassword",
				table: "AspNetUsers",
				type: "nvarchar(max)",
				nullable: false,
				defaultValue: "");

			migrationBuilder.AddColumn<string>(
				name: "password",
				table: "AspNetUsers",
				type: "nvarchar(max)",
				nullable: false,
				defaultValue: "");
		}
	}
}
