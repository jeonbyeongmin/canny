-- CreateTable
CREATE TABLE "sites" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "url" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'active',
    "description" TEXT,
    "lastCrawled" DATETIME,
    "articlesCount" INTEGER NOT NULL DEFAULT 0,
    "userId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "sites_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_users" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "password" TEXT,
    "emailVerified" DATETIME,
    "image" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "openaiApiKey" TEXT,
    "gptModel" TEXT DEFAULT 'gpt-4',
    "gptTemperature" REAL DEFAULT 0.7,
    "gptMaxTokens" INTEGER DEFAULT 2000,
    "gptSystemPrompt" TEXT,
    "gptConfigured" BOOLEAN NOT NULL DEFAULT false,
    "company" TEXT,
    "timezone" TEXT DEFAULT 'Asia/Seoul',
    "emailNewsletter" BOOLEAN NOT NULL DEFAULT true,
    "emailDigest" BOOLEAN NOT NULL DEFAULT false,
    "pushNotifications" BOOLEAN NOT NULL DEFAULT true,
    "weeklyReport" BOOLEAN NOT NULL DEFAULT true,
    "systemUpdates" BOOLEAN NOT NULL DEFAULT true,
    "language" TEXT DEFAULT 'ko',
    "dateFormat" TEXT DEFAULT 'YYYY-MM-DD',
    "timeFormat" TEXT DEFAULT '24h',
    "newsletterFrequency" TEXT DEFAULT 'daily',
    "newsletterDeliveryTime" TEXT DEFAULT '09:00',
    "newsletterMaxArticles" INTEGER DEFAULT 10,
    "newsletterIncludeSummary" BOOLEAN NOT NULL DEFAULT true,
    "newsletterTone" TEXT DEFAULT 'Neutral',
    "newsletterLength" TEXT DEFAULT 'Medium',
    "newsletterFormat" TEXT DEFAULT 'Classic'
);
INSERT INTO "new_users" ("createdAt", "email", "emailVerified", "gptConfigured", "gptMaxTokens", "gptModel", "gptSystemPrompt", "gptTemperature", "id", "image", "name", "openaiApiKey", "password", "updatedAt") SELECT "createdAt", "email", "emailVerified", "gptConfigured", "gptMaxTokens", "gptModel", "gptSystemPrompt", "gptTemperature", "id", "image", "name", "openaiApiKey", "password", "updatedAt" FROM "users";
DROP TABLE "users";
ALTER TABLE "new_users" RENAME TO "users";
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
