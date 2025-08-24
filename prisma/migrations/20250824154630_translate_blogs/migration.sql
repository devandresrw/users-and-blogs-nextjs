-- CreateTable
CREATE TABLE "public"."translation_queue" (
    "id" TEXT NOT NULL,
    "blogId" TEXT NOT NULL,
    "targetLanguage" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "retryCount" INTEGER NOT NULL DEFAULT 0,
    "errorMessage" TEXT,
    "priority" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "processedAt" TIMESTAMP(3),
    "completedAt" TIMESTAMP(3),

    CONSTRAINT "translation_queue_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "translation_queue_status_priority_createdAt_idx" ON "public"."translation_queue"("status", "priority", "createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "translation_queue_blogId_targetLanguage_key" ON "public"."translation_queue"("blogId", "targetLanguage");

-- AddForeignKey
ALTER TABLE "public"."translation_queue" ADD CONSTRAINT "translation_queue_blogId_fkey" FOREIGN KEY ("blogId") REFERENCES "public"."Blog"("id") ON DELETE CASCADE ON UPDATE CASCADE;
