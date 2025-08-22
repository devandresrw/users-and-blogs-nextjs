/*
  Warnings:

  - You are about to drop the `BlogCategory` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."BlogCategory" DROP CONSTRAINT "BlogCategory_blogId_fkey";

-- DropForeignKey
ALTER TABLE "public"."BlogCategory" DROP CONSTRAINT "BlogCategory_categoryId_fkey";

-- DropTable
DROP TABLE "public"."BlogCategory";
