-- CreateTable
CREATE TABLE "User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "gender" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "bio" TEXT,
    "website" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "passwordHash" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "SocialLink" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" INTEGER NOT NULL,
    "type" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    CONSTRAINT "SocialLink_id_fkey" FOREIGN KEY ("id") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
