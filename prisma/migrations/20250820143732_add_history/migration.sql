-- AlterTable
ALTER TABLE "public"."User" ADD COLUMN     "description" TEXT,
ADD COLUMN     "interests" TEXT[];

-- CreateTable
CREATE TABLE "public"."ReadingHistory" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "articleId" TEXT NOT NULL,
    "readAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "readTime" INTEGER NOT NULL,

    CONSTRAINT "ReadingHistory_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ReadingHistory_userId_articleId_key" ON "public"."ReadingHistory"("userId", "articleId");

-- AddForeignKey
ALTER TABLE "public"."ReadingHistory" ADD CONSTRAINT "ReadingHistory_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
