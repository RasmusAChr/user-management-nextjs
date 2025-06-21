/*
  Warnings:

  - You are about to drop the column `language` on the `User` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "gender" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "bio" TEXT NOT NULL,
    "website" TEXT NOT NULL,
    "userImageURI" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "lastSeen" DATETIME,
    "isOnline" BOOLEAN,
    "status" TEXT NOT NULL DEFAULT 'ACTIVE',
    "teamId" INTEGER,
    "roleId" INTEGER,
    "emailVerified" BOOLEAN NOT NULL DEFAULT false,
    "twoFactorEnabled" BOOLEAN NOT NULL DEFAULT false,
    "lastLogin" DATETIME NOT NULL,
    "lastFailedLogin" DATETIME,
    "loginAttempts" INTEGER NOT NULL DEFAULT 0,
    "lockedAt" DATETIME,
    "locked" BOOLEAN NOT NULL DEFAULT false,
    "passwordHash" TEXT NOT NULL,
    "passwordChangedAt" DATETIME NOT NULL,
    "resetToken" TEXT,
    "resetTokenExpiry" DATETIME,
    "termsAcceptedAt" DATETIME,
    "privacyPolicyAcceptedAt" DATETIME,
    "ageConfirmed" BOOLEAN,
    CONSTRAINT "User_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "User_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "Role" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_User" ("ageConfirmed", "bio", "country", "createdAt", "email", "emailVerified", "firstName", "gender", "id", "isOnline", "lastFailedLogin", "lastLogin", "lastName", "lastSeen", "locked", "lockedAt", "loginAttempts", "passwordChangedAt", "passwordHash", "phoneNumber", "privacyPolicyAcceptedAt", "resetToken", "resetTokenExpiry", "roleId", "status", "teamId", "termsAcceptedAt", "twoFactorEnabled", "updatedAt", "userImageURI", "username", "website") SELECT "ageConfirmed", "bio", "country", "createdAt", "email", "emailVerified", "firstName", "gender", "id", "isOnline", "lastFailedLogin", "lastLogin", "lastName", "lastSeen", "locked", "lockedAt", "loginAttempts", "passwordChangedAt", "passwordHash", "phoneNumber", "privacyPolicyAcceptedAt", "resetToken", "resetTokenExpiry", "roleId", "status", "teamId", "termsAcceptedAt", "twoFactorEnabled", "updatedAt", "userImageURI", "username", "website" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
