-- CreateTable
CREATE TABLE "AuthUser" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "DateCreated" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "DateUpdated" DATETIME NOT NULL
);
