using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AgroMind.GP.Repository.Data.Migrations
{
	/// <inheritdoc />
	public partial class TPT_UserInheritence : Migration
	{
		/// <inheritdoc />
		protected override void Up(MigrationBuilder migrationBuilder)
		{
			migrationBuilder.AddColumn<bool>(
				name: "IsActive",
				table: "AspNetUsers",
				type: "bit",
				nullable: false,
				defaultValue: false);

			migrationBuilder.AddColumn<bool>(
				name: "IsBlocked",
				table: "AspNetUsers",
				type: "bit",
				nullable: false,
				defaultValue: false);

			migrationBuilder.AddColumn<DateTime>(
				name: "LastLogin",
				table: "AspNetUsers",
				type: "datetime2",
				nullable: true);

			migrationBuilder.CreateTable(
				name: "AgriculturalExpert",
				columns: table => new
				{
					Id = table.Column<string>(type: "nvarchar(450)", nullable: false),
					Specialization = table.Column<string>(type: "nvarchar(max)", nullable: false),
					ExperienceYears = table.Column<int>(type: "int", nullable: false),
					AvailableHours = table.Column<string>(type: "nvarchar(max)", nullable: false),
					ExpertRating = table.Column<int>(type: "int", nullable: false),
					RegionCovered = table.Column<string>(type: "nvarchar(max)", nullable: false),
					PreferedCrops = table.Column<string>(type: "nvarchar(max)", nullable: false)
				},
				constraints: table =>
				{
					table.PrimaryKey("PK_AgriculturalExpert", x => x.Id);
					table.ForeignKey(
						name: "FK_AgriculturalExpert_AspNetUsers_Id",
						column: x => x.Id,
						principalTable: "AspNetUsers",
						principalColumn: "Id",
						onDelete: ReferentialAction.Cascade);
				});

			migrationBuilder.CreateTable(
				name: "Farmer",
				columns: table => new
				{
					Id = table.Column<string>(type: "nvarchar(450)", nullable: false)
				},
				constraints: table =>
				{
					table.PrimaryKey("PK_Farmer", x => x.Id);
					table.ForeignKey(
						name: "FK_Farmer_AspNetUsers_Id",
						column: x => x.Id,
						principalTable: "AspNetUsers",
						principalColumn: "Id",
						onDelete: ReferentialAction.Cascade);
				});

			migrationBuilder.CreateTable(
				name: "Supplier",
				columns: table => new
				{
					Id = table.Column<string>(type: "nvarchar(450)", nullable: false),
					inventoryCount = table.Column<int>(type: "int", nullable: false)
				},
				constraints: table =>
				{
					table.PrimaryKey("PK_Supplier", x => x.Id);
					table.ForeignKey(
						name: "FK_Supplier_AspNetUsers_Id",
						column: x => x.Id,
						principalTable: "AspNetUsers",
						principalColumn: "Id",
						onDelete: ReferentialAction.Cascade);
				});

			migrationBuilder.CreateTable(
				name: "SystemAdministrator",
				columns: table => new
				{
					Id = table.Column<string>(type: "nvarchar(450)", nullable: false)
				},
				constraints: table =>
				{
					table.PrimaryKey("PK_SystemAdministrator", x => x.Id);
					table.ForeignKey(
						name: "FK_SystemAdministrator_AspNetUsers_Id",
						column: x => x.Id,
						principalTable: "AspNetUsers",
						principalColumn: "Id",
						onDelete: ReferentialAction.Cascade);
				});
		}

		/// <inheritdoc />
		protected override void Down(MigrationBuilder migrationBuilder)
		{
			migrationBuilder.DropTable(
				name: "AgriculturalExpert");

			migrationBuilder.DropTable(
				name: "Farmer");

			migrationBuilder.DropTable(
				name: "Supplier");

			migrationBuilder.DropTable(
				name: "SystemAdministrator");

			migrationBuilder.DropColumn(
				name: "IsActive",
				table: "AspNetUsers");

			migrationBuilder.DropColumn(
				name: "IsBlocked",
				table: "AspNetUsers");

			migrationBuilder.DropColumn(
				name: "LastLogin",
				table: "AspNetUsers");
		}
	}
}
