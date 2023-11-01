-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_UserAccount" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "token" TEXT,
    "Salt" TEXT NOT NULL,
    "DateCreated" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "DateUpdated" DATETIME NOT NULL
);
INSERT INTO "new_UserAccount" ("DateCreated", "DateUpdated", "Salt", "id", "password", "token", "username") SELECT "DateCreated", "DateUpdated", "Salt", "id", "password", "token", "username" FROM "UserAccount";
DROP TABLE "UserAccount";
ALTER TABLE "new_UserAccount" RENAME TO "UserAccount";
CREATE UNIQUE INDEX "UserAccount_token_key" ON "UserAccount"("token");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
