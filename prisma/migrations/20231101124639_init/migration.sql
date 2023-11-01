/*
  Warnings:

  - You are about to drop the `AuthUser` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "AuthUser";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "UserAccount" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "DateCreated" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "DateUpdated" DATETIME NOT NULL
);
