/*
  Warnings:

  - You are about to drop the column `category` on the `Blog` table. All the data in the column will be lost.
  - You are about to drop the column `imagenSeo` on the `Blog` table. All the data in the column will be lost.
  - You are about to drop the column `img_card` on the `Blog` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."Blog" DROP COLUMN "category",
DROP COLUMN "imagenSeo",
DROP COLUMN "img_card",
ADD COLUMN     "categoryId" TEXT,
ADD COLUMN     "imagenCardId" TEXT,
ADD COLUMN     "imagenSeoId" TEXT,
ADD COLUMN     "readTime" INTEGER,
ADD COLUMN     "seoDescription" TEXT,
ADD COLUMN     "views" INTEGER NOT NULL DEFAULT 0,
ALTER COLUMN "newsItemId" DROP NOT NULL;

-- CreateTable
CREATE TABLE "public"."Tag" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT,

    CONSTRAINT "Tag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."BlogTag" (
    "id" TEXT NOT NULL,
    "blogId" TEXT NOT NULL,
    "tagId" TEXT NOT NULL,

    CONSTRAINT "BlogTag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."BlogCategory" (
    "id" TEXT NOT NULL,
    "blogId" TEXT NOT NULL,
    "categoryId" TEXT NOT NULL,

    CONSTRAINT "BlogCategory_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Tag_name_key" ON "public"."Tag"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Tag_slug_key" ON "public"."Tag"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "BlogTag_blogId_tagId_key" ON "public"."BlogTag"("blogId", "tagId");

-- CreateIndex
CREATE UNIQUE INDEX "BlogCategory_blogId_categoryId_key" ON "public"."BlogCategory"("blogId", "categoryId");

-- AddForeignKey
ALTER TABLE "public"."Blog" ADD CONSTRAINT "Blog_imagenSeoId_fkey" FOREIGN KEY ("imagenSeoId") REFERENCES "public"."Image"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Blog" ADD CONSTRAINT "Blog_imagenCardId_fkey" FOREIGN KEY ("imagenCardId") REFERENCES "public"."Image"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Blog" ADD CONSTRAINT "Blog_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "public"."Category"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."BlogTag" ADD CONSTRAINT "BlogTag_blogId_fkey" FOREIGN KEY ("blogId") REFERENCES "public"."Blog"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."BlogTag" ADD CONSTRAINT "BlogTag_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "public"."Tag"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."BlogCategory" ADD CONSTRAINT "BlogCategory_blogId_fkey" FOREIGN KEY ("blogId") REFERENCES "public"."Blog"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."BlogCategory" ADD CONSTRAINT "BlogCategory_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "public"."Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;
