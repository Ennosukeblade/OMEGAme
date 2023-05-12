using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace server.Migrations
{
    /// <inheritdoc />
    public partial class SecondMigration : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Games_GameJams_GameJamId",
                table: "Games");

            migrationBuilder.AlterColumn<int>(
                name: "GameJamId",
                table: "Games",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddForeignKey(
                name: "FK_Games_GameJams_GameJamId",
                table: "Games",
                column: "GameJamId",
                principalTable: "GameJams",
                principalColumn: "GameJamId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Games_GameJams_GameJamId",
                table: "Games");

            migrationBuilder.AlterColumn<int>(
                name: "GameJamId",
                table: "Games",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Games_GameJams_GameJamId",
                table: "Games",
                column: "GameJamId",
                principalTable: "GameJams",
                principalColumn: "GameJamId",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
