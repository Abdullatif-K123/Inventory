/*
  Warnings:

  - Added the required column `fileUrl` to the `Item` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Item" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "site_id" INTEGER NOT NULL,
    "item_name" TEXT NOT NULL,
    "last_maintenance_date" DATETIME,
    "next_maintenance_date" DATETIME,
    "notes" TEXT,
    "fileUrl" TEXT NOT NULL,
    CONSTRAINT "Item_site_id_fkey" FOREIGN KEY ("site_id") REFERENCES "Site" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Item" ("id", "item_name", "last_maintenance_date", "next_maintenance_date", "notes", "site_id") SELECT "id", "item_name", "last_maintenance_date", "next_maintenance_date", "notes", "site_id" FROM "Item";
DROP TABLE "Item";
ALTER TABLE "new_Item" RENAME TO "Item";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
