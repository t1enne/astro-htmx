/*
  Warnings:

  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Fruit` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "name" TEXT
);
INSERT INTO "new_User" ("email", "id", "name") SELECT "email", "id", "name" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
CREATE TABLE "new_Fruit" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "size" TEXT NOT NULL,
    "eaten" BOOLEAN NOT NULL DEFAULT false,
    "ownerId" TEXT NOT NULL,
    CONSTRAINT "Fruit_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Fruit" ("eaten", "id", "name", "ownerId", "size") SELECT "eaten", "id", "name", "ownerId", "size" FROM "Fruit";
DROP TABLE "Fruit";
ALTER TABLE "new_Fruit" RENAME TO "Fruit";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
