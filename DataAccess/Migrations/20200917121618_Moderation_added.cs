using Microsoft.EntityFrameworkCore.Migrations;

namespace KnowledgeBase.DataAccess.Migrations
{
    public partial class Moderation_added : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Answers_AspNetUsers_UserId",
                table: "Answers");

            migrationBuilder.DropForeignKey(
                name: "FK_Questions_AspNetUsers_UserId",
                table: "Questions");

            migrationBuilder.AddColumn<string>(
                name: "ModeratorId",
                table: "Questions",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ModeratorMessage",
                table: "Questions",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "Type",
                table: "Questions",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AlterColumn<string>(
                name: "UserId",
                table: "Answers",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(450)");

            migrationBuilder.AddColumn<string>(
                name: "ModeratorId",
                table: "Answers",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ModeratorMessage",
                table: "Answers",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Questions_ModeratorId",
                table: "Questions",
                column: "ModeratorId");

            migrationBuilder.CreateIndex(
                name: "IX_Answers_ModeratorId",
                table: "Answers",
                column: "ModeratorId");

            migrationBuilder.AddForeignKey(
                name: "FK_Answers_AspNetUsers_ModeratorId",
                table: "Answers",
                column: "ModeratorId",
                principalTable: "AspNetUsers",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Answers_AspNetUsers_UserId",
                table: "Answers",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Questions_AspNetUsers_ModeratorId",
                table: "Questions",
                column: "ModeratorId",
                principalTable: "AspNetUsers",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Questions_AspNetUsers_UserId",
                table: "Questions",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Answers_AspNetUsers_ModeratorId",
                table: "Answers");

            migrationBuilder.DropForeignKey(
                name: "FK_Answers_AspNetUsers_UserId",
                table: "Answers");

            migrationBuilder.DropForeignKey(
                name: "FK_Questions_AspNetUsers_ModeratorId",
                table: "Questions");

            migrationBuilder.DropForeignKey(
                name: "FK_Questions_AspNetUsers_UserId",
                table: "Questions");

            migrationBuilder.DropIndex(
                name: "IX_Questions_ModeratorId",
                table: "Questions");

            migrationBuilder.DropIndex(
                name: "IX_Answers_ModeratorId",
                table: "Answers");

            migrationBuilder.DropColumn(
                name: "ModeratorId",
                table: "Questions");

            migrationBuilder.DropColumn(
                name: "ModeratorMessage",
                table: "Questions");

            migrationBuilder.DropColumn(
                name: "Type",
                table: "Questions");

            migrationBuilder.DropColumn(
                name: "ModeratorId",
                table: "Answers");

            migrationBuilder.DropColumn(
                name: "ModeratorMessage",
                table: "Answers");

            migrationBuilder.AlterColumn<string>(
                name: "UserId",
                table: "Answers",
                type: "nvarchar(450)",
                nullable: false,
                oldClrType: typeof(string),
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Answers_AspNetUsers_UserId",
                table: "Answers",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Questions_AspNetUsers_UserId",
                table: "Questions",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
