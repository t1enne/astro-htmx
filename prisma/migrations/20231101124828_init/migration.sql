/*
  Warnings:

  - Added the required column `Salt` to the `UserAccount` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_UserAccount" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "Salt" TEXT NOT NULL,
    "DateCreated" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "DateUpdated" DATETIME NOT NULL
);
INSERT INTO "new_UserAccount" ("DateCreated", "DateUpdated", "id", "password", "token", "username") SELECT "DateCreated", "DateUpdated", "id", "password", "token", "username" FROM "UserAccount";
DROP TABLE "UserAccount";
ALTER TABLE "new_UserAccount" RENAME TO "UserAccount";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
