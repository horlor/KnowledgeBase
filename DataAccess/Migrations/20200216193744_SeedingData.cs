using Microsoft.EntityFrameworkCore.Migrations;

namespace KnowledgeBase.DataAccess.Migrations
{
    public partial class SeedingData : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "Questions",
                columns: new[] { "Id", "Content", "Title", "UserId" },
                values: new object[] { 1, "Curabitur auctor bibendum dui, at posuere lorem tempor eu. Aenean porttitor vulputate ex, in ultricies mi dictum nec. Fusce maximus faucibus tortor, quis vestibulum augue ornare eu. Vestibulum ullamcorper diam sit amet urna vulputate efficitur. Ut ac finibus felis, sagittis blandit eros. Maecenas vulputate aliquet quam eu sodales. Vestibulum aliquet blandit mauris eu porttitor. Aliquam in porttitor nulla. Praesent ac tellus sapien. Morbi tempor varius eleifend. Pellentesque est tellus, maximus quis porttitor eu, sagittis ut libero. Cras ut tincidunt magna, vitae tempor mauris. Sed imperdiet dolor id dui luctus mollis. Etiam sit amet mattis est.", "This is a question about something extremely important", null });

            migrationBuilder.InsertData(
                table: "Questions",
                columns: new[] { "Id", "Content", "Title", "UserId" },
                values: new object[] { 2, "Curabitur auctor bibendum dui, at posuere lorem tempor eu. Aenean porttitor vulputate ex, in ultricies mi dictum nec. Fusce maximus faucibus tortor, quis vestibulum augue ornare eu. Vestibulum ullamcorper diam sit amet urna vulputate efficitur. Ut ac finibus felis, sagittis blandit eros. Maecenas vulputate aliquet quam eu sodales. Vestibulum aliquet blandit mauris eu porttitor. Aliquam in porttitor nulla. Praesent ac tellus sapien. Morbi tempor varius eleifend. Pellentesque est tellus, maximus quis porttitor eu, sagittis ut libero. Cras ut tincidunt magna, vitae tempor mauris. Sed imperdiet dolor id dui luctus mollis. Etiam sit amet mattis est.", "This is a question about something extremely important", null });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Questions",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Questions",
                keyColumn: "Id",
                keyValue: 2);
        }
    }
}
