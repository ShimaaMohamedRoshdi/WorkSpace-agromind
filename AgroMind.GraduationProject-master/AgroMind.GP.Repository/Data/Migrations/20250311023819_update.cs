using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AgroMind.GP.Repository.Data.Migrations
{
	/// <inheritdoc />
	public partial class update : Migration
	{
		/// <inheritdoc />
		protected override void Up(MigrationBuilder migrationBuilder)
		{
			migrationBuilder.AlterColumn<string>(
				name: "Status",
				table: "CropStage",
				type: "nvarchar(max)",
				nullable: true,
				oldClrType: typeof(string),
				oldType: "nvarchar(max)");
		}

		/// <inheritdoc />
		protected override void Down(MigrationBuilder migrationBuilder)
		{
			migrationBuilder.AlterColumn<string>(
				name: "Status",
				table: "CropStage",
				type: "nvarchar(max)",
				nullable: false,
				defaultValue: "",
				oldClrType: typeof(string),
				oldType: "nvarchar(max)",
				oldNullable: true);
		}
	}
}
