-- CreateTable
CREATE TABLE "public"."SocialMedia" (
    "id" TEXT NOT NULL,
    "platform" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "username" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT,
    "authorId" TEXT,

    CONSTRAINT "SocialMedia_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "SocialMedia_platform_idx" ON "public"."SocialMedia"("platform");

-- CreateIndex
CREATE UNIQUE INDEX "SocialMedia_userId_platform_key" ON "public"."SocialMedia"("userId", "platform");

-- CreateIndex
CREATE UNIQUE INDEX "SocialMedia_authorId_platform_key" ON "public"."SocialMedia"("authorId", "platform");

-- AddForeignKey
ALTER TABLE "public"."SocialMedia" ADD CONSTRAINT "SocialMedia_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."SocialMedia" ADD CONSTRAINT "SocialMedia_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "public"."Author"("id") ON DELETE CASCADE ON UPDATE CASCADE;
