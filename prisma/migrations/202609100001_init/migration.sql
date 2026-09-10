-- CreateTable
CREATE TABLE "Category" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "parentId" TEXT,
    "seoTitle" TEXT NOT NULL DEFAULT '',
    "seoDescription" TEXT NOT NULL DEFAULT '',
    "active" BOOLEAN NOT NULL DEFAULT true,
    "sortOrder" INTEGER NOT NULL DEFAULT 0
);

-- CreateTable
CREATE TABLE "Product" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "categoryId" TEXT NOT NULL,
    "summary" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "cover" TEXT NOT NULL,
    "gallery" TEXT NOT NULL DEFAULT '[]',
    "alt" TEXT NOT NULL,
    "specs" TEXT NOT NULL DEFAULT '{}',
    "uses" TEXT NOT NULL DEFAULT '[]',
    "options" TEXT NOT NULL DEFAULT '[]',
    "related" TEXT NOT NULL DEFAULT '[]',
    "whatsappMessage" TEXT NOT NULL DEFAULT '',
    "seoTitle" TEXT NOT NULL DEFAULT '',
    "seoDescription" TEXT NOT NULL DEFAULT '',
    "active" BOOLEAN NOT NULL DEFAULT true,
    "featured" BOOLEAN NOT NULL DEFAULT false,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Product_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Sector" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "seoTitle" TEXT NOT NULL DEFAULT '',
    "seoDescription" TEXT NOT NULL DEFAULT '',
    "active" BOOLEAN NOT NULL DEFAULT true,
    "sortOrder" INTEGER NOT NULL DEFAULT 0
);

-- CreateTable
CREATE TABLE "FAQ" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "question" TEXT NOT NULL,
    "answer" TEXT NOT NULL,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "productId" TEXT NOT NULL,
    CONSTRAINT "FAQ_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "BlogPost" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "excerpt" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "alt" TEXT NOT NULL,
    "seoTitle" TEXT NOT NULL DEFAULT '',
    "seoDescription" TEXT NOT NULL DEFAULT '',
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "QuoteRequest" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "company" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "product" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "quantity" TEXT NOT NULL,
    "dimensions" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "attachment" TEXT NOT NULL DEFAULT '',
    "attachmentName" TEXT NOT NULL DEFAULT '',
    "status" TEXT NOT NULL DEFAULT 'Yeni',
    "notes" TEXT NOT NULL DEFAULT '',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "SiteSetting" (
    "key" TEXT NOT NULL PRIMARY KEY,
    "value" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Media" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "url" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "alt" TEXT NOT NULL,
    "mime" TEXT NOT NULL,
    "size" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "AdminSession" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "expiresAt" DATETIME NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "RateLimit" (
    "key" TEXT NOT NULL PRIMARY KEY,
    "count" INTEGER NOT NULL DEFAULT 1,
    "expiresAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "_ProductToSector" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_ProductToSector_A_fkey" FOREIGN KEY ("A") REFERENCES "Product" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_ProductToSector_B_fkey" FOREIGN KEY ("B") REFERENCES "Sector" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Category_slug_key" ON "Category"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Product_slug_key" ON "Product"("slug");

-- CreateIndex
CREATE INDEX "Product_active_sortOrder_idx" ON "Product"("active", "sortOrder");

-- CreateIndex
CREATE INDEX "Product_categoryId_idx" ON "Product"("categoryId");

-- CreateIndex
CREATE UNIQUE INDEX "Sector_slug_key" ON "Sector"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "BlogPost_slug_key" ON "BlogPost"("slug");

-- CreateIndex
CREATE INDEX "QuoteRequest_status_createdAt_idx" ON "QuoteRequest"("status", "createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "Media_url_key" ON "Media"("url");

-- CreateIndex
CREATE UNIQUE INDEX "_ProductToSector_AB_unique" ON "_ProductToSector"("A", "B");

-- CreateIndex
CREATE INDEX "_ProductToSector_B_index" ON "_ProductToSector"("B");
