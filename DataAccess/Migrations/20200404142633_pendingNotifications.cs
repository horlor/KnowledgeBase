using Microsoft.EntityFrameworkCore.Migrations;

namespace KnowledgeBase.DataAccess.Migrations
{
    public partial class pendingNotifications : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Read",
                table: "Notifications");

            migrationBuilder.AddColumn<bool>(
                name: "Pending",
                table: "Notifications",
                nullable: false,
                defaultValue: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Pending",
                table: "Notifications");

            migrationBuilder.AddColumn<bool>(
                name: "Read",
                table: "Notifications",
                type: "bit",
                nullable: false,
                defaultValue: false);
        }
    }
}
