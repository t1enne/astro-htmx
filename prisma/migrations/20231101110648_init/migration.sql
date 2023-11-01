/*
  Warnings:

  - You are about to drop the column `eaten` on the `Fruit` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Fruit" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "size" TEXT NOT NULL,
    "isEaten" BOOLEAN NOT NULL DEFAULT false,
    "ownerId" TEXT NOT NULL,
    CONSTRAINT "Fruit_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Fruit" ("id", "name", "ownerId", "size") SELECT "id", "name", "ownerId", "size" FROM "Fruit";
DROP TABLE "Fruit";
ALTER TABLE "new_Fruit" RENAME TO "Fruit";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
