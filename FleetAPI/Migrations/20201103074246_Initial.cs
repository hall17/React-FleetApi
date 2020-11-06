using Microsoft.EntityFrameworkCore.Migrations;

namespace FleetAPI.Migrations
{
    public partial class Initial : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Aircrafts",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Model = table.Column<string>(nullable: false),
                    ModelType = table.Column<string>(nullable: false),
                    Registration = table.Column<string>(nullable: false),
                    Effectivity = table.Column<string>(nullable: false),
                    BodyNo = table.Column<string>(nullable: true),
                    LineNo = table.Column<string>(nullable: true),
                    SerialNo = table.Column<string>(nullable: true),
                    Engine = table.Column<string>(nullable: false),
                    DeliveryDate = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Aircrafts", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "AircraftTypes",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Manufacturer = table.Column<string>(nullable: false),
                    Model = table.Column<string>(nullable: false),
                    ModelType = table.Column<string>(nullable: false),
                    Engine = table.Column<string>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AircraftTypes", x => x.Id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Aircrafts");

            migrationBuilder.DropTable(
                name: "AircraftTypes");
        }
    }
}
