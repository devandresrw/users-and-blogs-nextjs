-- AlterTable
ALTER TABLE "public"."Blog" ADD COLUMN     "baseLanguage" TEXT NOT NULL DEFAULT 'es';

-- AlterTable
ALTER TABLE "public"."Category" ADD COLUMN     "baseLanguage" TEXT NOT NULL DEFAULT 'es';

-- AlterTable
ALTER TABLE "public"."NewsItem" ADD COLUMN     "baseLanguage" TEXT NOT NULL DEFAULT 'es';

-- AlterTable
ALTER TABLE "public"."Poll" ADD COLUMN     "baseLanguage" TEXT NOT NULL DEFAULT 'es';

-- AlterTable
ALTER TABLE "public"."PollOption" ADD COLUMN     "baseLanguage" TEXT NOT NULL DEFAULT 'es';

-- AlterTable
ALTER TABLE "public"."Tag" ADD COLUMN     "baseLanguage" TEXT NOT NULL DEFAULT 'es';

-- CreateTable
CREATE TABLE "public"."Translation" (
    "id" TEXT NOT NULL,
    "entityType" TEXT NOT NULL,
    "entityId" TEXT NOT NULL,
    "language" TEXT NOT NULL,
    "field" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Translation_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Translation_entityType_entityId_idx" ON "public"."Translation"("entityType", "entityId");

-- CreateIndex
CREATE INDEX "Translation_language_idx" ON "public"."Translation"("language");

-- CreateIndex
CREATE UNIQUE INDEX "Translation_entityType_entityId_language_field_key" ON "public"."Translation"("entityType", "entityId", "language", "field");
