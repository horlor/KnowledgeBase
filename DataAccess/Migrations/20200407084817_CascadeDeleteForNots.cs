using Microsoft.EntityFrameworkCore.Migrations;

namespace KnowledgeBase.DataAccess.Migrations
{
    public partial class CascadeDeleteForNots : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Notifications_Questions_QuestionId",
                table: "Notifications");

            migrationBuilder.AddForeignKey(
                name: "FK_Notifications_Questions_QuestionId",
                table: "Notifications",
                column: "QuestionId",
                principalTable: "Questions",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Notifications_Questions_QuestionId",
                table: "Notifications");

            migrationBuilder.AddForeignKey(
                name: "FK_Notifications_Questions_QuestionId",
                table: "Notifications",
                column: "QuestionId",
                principalTable: "Questions",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
