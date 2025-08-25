/*
  Warnings:

  - You are about to drop the column `entityId` on the `Translation` table. All the data in the column will be lost.
  - You are about to drop the column `field` on the `Translation` table. All the data in the column will be lost.
  - You are about to drop the column `language` on the `Translation` table. All the data in the column will be lost.
  - You are about to drop the column `value` on the `Translation` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[originalEntityId,entityType]` on the table `Translation` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `originalEntityId` to the `Translation` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "public"."Translation_entityType_entityId_idx";

-- DropIndex
DROP INDEX "public"."Translation_entityType_entityId_language_field_key";

-- DropIndex
DROP INDEX "public"."Translation_language_idx";

-- AlterTable
ALTER TABLE "public"."Blog" ADD COLUMN     "isTranslation" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "originalBlogId" TEXT;

-- AlterTable
ALTER TABLE "public"."Category" ADD COLUMN     "isTranslation" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "originalCategoryId" TEXT;

-- AlterTable
ALTER TABLE "public"."Poll" ADD COLUMN     "isTranslation" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "originalPollId" TEXT;

-- AlterTable
ALTER TABLE "public"."Tag" ADD COLUMN     "isTranslation" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "originalTagId" TEXT;

-- AlterTable
ALTER TABLE "public"."Translation" DROP COLUMN "entityId",
DROP COLUMN "field",
DROP COLUMN "language",
DROP COLUMN "value",
ADD COLUMN     "originalEntityId" TEXT NOT NULL,
ADD COLUMN     "translatedIds" TEXT[];

-- CreateIndex
CREATE INDEX "Blog_originalBlogId_idx" ON "public"."Blog"("originalBlogId");

-- CreateIndex
CREATE INDEX "Blog_baseLanguage_idx" ON "public"."Blog"("baseLanguage");

-- CreateIndex
CREATE INDEX "Blog_isTranslation_idx" ON "public"."Blog"("isTranslation");

-- CreateIndex
CREATE INDEX "Category_originalCategoryId_idx" ON "public"."Category"("originalCategoryId");

-- CreateIndex
CREATE INDEX "Category_baseLanguage_idx" ON "public"."Category"("baseLanguage");

-- CreateIndex
CREATE INDEX "Poll_originalPollId_idx" ON "public"."Poll"("originalPollId");

-- CreateIndex
CREATE INDEX "Poll_baseLanguage_idx" ON "public"."Poll"("baseLanguage");

-- CreateIndex
CREATE INDEX "Tag_originalTagId_idx" ON "public"."Tag"("originalTagId");

-- CreateIndex
CREATE INDEX "Tag_baseLanguage_idx" ON "public"."Tag"("baseLanguage");

-- CreateIndex
CREATE INDEX "Translation_originalEntityId_idx" ON "public"."Translation"("originalEntityId");

-- CreateIndex
CREATE INDEX "Translation_entityType_idx" ON "public"."Translation"("entityType");

-- CreateIndex
CREATE UNIQUE INDEX "Translation_originalEntityId_entityType_key" ON "public"."Translation"("originalEntityId", "entityType");

-- AddForeignKey
ALTER TABLE "public"."Blog" ADD CONSTRAINT "Blog_originalBlogId_fkey" FOREIGN KEY ("originalBlogId") REFERENCES "public"."Blog"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Category" ADD CONSTRAINT "Category_originalCategoryId_fkey" FOREIGN KEY ("originalCategoryId") REFERENCES "public"."Category"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Tag" ADD CONSTRAINT "Tag_originalTagId_fkey" FOREIGN KEY ("originalTagId") REFERENCES "public"."Tag"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Poll" ADD CONSTRAINT "Poll_originalPollId_fkey" FOREIGN KEY ("originalPollId") REFERENCES "public"."Poll"("id") ON DELETE SET NULL ON UPDATE CASCADE;
