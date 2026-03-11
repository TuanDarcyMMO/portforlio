-- CreateTable
CREATE TABLE "Photo" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "likes" INTEGER NOT NULL DEFAULT 0,
    "views" INTEGER NOT NULL DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "PhotoLike" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "photoId" TEXT NOT NULL,
    "ipAddress" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "PhotoLike_photoId_fkey" FOREIGN KEY ("photoId") REFERENCES "Photo" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "PhotoView" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "photoId" TEXT NOT NULL,
    "ipAddress" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "PhotoView_photoId_fkey" FOREIGN KEY ("photoId") REFERENCES "Photo" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE INDEX "Photo_id_idx" ON "Photo"("id");

-- CreateIndex
CREATE INDEX "PhotoLike_photoId_idx" ON "PhotoLike"("photoId");

-- CreateIndex
CREATE INDEX "PhotoLike_ipAddress_idx" ON "PhotoLike"("ipAddress");

-- CreateIndex
CREATE UNIQUE INDEX "PhotoLike_photoId_ipAddress_key" ON "PhotoLike"("photoId", "ipAddress");

-- CreateIndex
CREATE INDEX "PhotoView_photoId_idx" ON "PhotoView"("photoId");

-- CreateIndex
CREATE INDEX "PhotoView_ipAddress_idx" ON "PhotoView"("ipAddress");

-- CreateIndex
CREATE UNIQUE INDEX "PhotoView_photoId_ipAddress_key" ON "PhotoView"("photoId", "ipAddress");
