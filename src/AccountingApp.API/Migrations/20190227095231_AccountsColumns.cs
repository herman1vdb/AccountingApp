using Microsoft.EntityFrameworkCore.Migrations;

namespace AccountingApp.API.Migrations
{
    public partial class AccountsColumns : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "isActive",
                table: "Accounts",
                nullable: false,
                defaultValue: true);

            migrationBuilder.AddColumn<bool>(
                name: "isControlAccount",
                table: "Accounts",
                nullable: false,
                defaultValue: false);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "isActive",
                table: "Accounts");

            migrationBuilder.DropColumn(
                name: "isControlAccount",
                table: "Accounts");
        }
    }
}
