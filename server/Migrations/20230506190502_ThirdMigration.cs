using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace server.Migrations
{
    /// <inheritdoc />
    public partial class ThirdMigration : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Asset_Users_UserId",
                table: "Asset");

            migrationBuilder.DropForeignKey(
                name: "FK_AssetComments_Asset_AssetId",
                table: "AssetComments");

            migrationBuilder.DropForeignKey(
                name: "FK_AssetImages_Asset_AssetId",
                table: "AssetImages");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Asset",
                table: "Asset");

            migrationBuilder.RenameTable(
                name: "Asset",
                newName: "Assets");

            migrationBuilder.RenameIndex(
                name: "IX_Asset_UserId",
                table: "Assets",
                newName: "IX_Assets_UserId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Assets",
                table: "Assets",
                column: "AssetId");

            migrationBuilder.AddForeignKey(
                name: "FK_AssetComments_Assets_AssetId",
                table: "AssetComments",
                column: "AssetId",
                principalTable: "Assets",
                principalColumn: "AssetId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_AssetImages_Assets_AssetId",
                table: "AssetImages",
                column: "AssetId",
                principalTable: "Assets",
                principalColumn: "AssetId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Assets_Users_UserId",
                table: "Assets",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "UserId",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AssetComments_Assets_AssetId",
                table: "AssetComments");

            migrationBuilder.DropForeignKey(
                name: "FK_AssetImages_Assets_AssetId",
                table: "AssetImages");

            migrationBuilder.DropForeignKey(
                name: "FK_Assets_Users_UserId",
                table: "Assets");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Assets",
                table: "Assets");

            migrationBuilder.RenameTable(
                name: "Assets",
                newName: "Asset");

            migrationBuilder.RenameIndex(
                name: "IX_Assets_UserId",
                table: "Asset",
                newName: "IX_Asset_UserId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Asset",
                table: "Asset",
                column: "AssetId");

            migrationBuilder.AddForeignKey(
                name: "FK_Asset_Users_UserId",
                table: "Asset",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "UserId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_AssetComments_Asset_AssetId",
                table: "AssetComments",
                column: "AssetId",
                principalTable: "Asset",
                principalColumn: "AssetId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_AssetImages_Asset_AssetId",
                table: "AssetImages",
                column: "AssetId",
                principalTable: "Asset",
                principalColumn: "AssetId",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
