-- CreateTable
CREATE TABLE "Site" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "site_name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Item" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "site_id" INTEGER NOT NULL,
    "item_name" TEXT NOT NULL,
    "last_maintenance_date" DATETIME,
    "next_maintenance_date" DATETIME,
    "notes" TEXT,
    CONSTRAINT "Item_site_id_fkey" FOREIGN KEY ("site_id") REFERENCES "Site" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
