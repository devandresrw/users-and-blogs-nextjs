/*
  Warnings:

  - A unique constraint covering the columns `[profileImageId]` on the table `Author` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "public"."Author" ADD COLUMN     "profileImageId" TEXT,
ADD COLUMN     "profilePicture" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Author_profileImageId_key" ON "public"."Author"("profileImageId");

-- AddForeignKey
ALTER TABLE "public"."Author" ADD CONSTRAINT "Author_profileImageId_fkey" FOREIGN KEY ("profileImageId") REFERENCES "public"."Image"("id") ON DELETE SET NULL ON UPDATE CASCADE;
