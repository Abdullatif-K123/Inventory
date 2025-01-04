/*
  Warnings:

  - Added the required column `fileUrl` to the `Site` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Site" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "site_name" TEXT NOT NULL,
    "fileUrl" TEXT NOT NULL
);
INSERT INTO "new_Site" ("id", "site_name") SELECT "id", "site_name" FROM "Site";
DROP TABLE "Site";
ALTER TABLE "new_Site" RENAME TO "Site";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
