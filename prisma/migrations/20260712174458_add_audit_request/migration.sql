-- CreateEnum
CREATE TYPE "AuditStatus" AS ENUM ('NEW', 'CONTACTED', 'CONVERTED');

-- CreateTable
CREATE TABLE "SiteSettings" (
    "id" TEXT NOT NULL DEFAULT 'singleton',
    "whatsappNumber" TEXT NOT NULL DEFAULT '8801700000000',
    "contactEmail" TEXT NOT NULL DEFAULT 'hello@digiboostbd.com',
    "contactAddress" TEXT NOT NULL DEFAULT 'Dhaka, Bangladesh',
    "accentColor" TEXT NOT NULL DEFAULT 'orange',
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SiteSettings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AuditRequest" (
    "id" TEXT NOT NULL,
    "businessName" TEXT NOT NULL,
    "ownerName" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "businessType" TEXT NOT NULL,
    "websiteOrPage" TEXT,
    "marketingChallenge" TEXT NOT NULL,
    "status" "AuditStatus" NOT NULL DEFAULT 'NEW',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AuditRequest_pkey" PRIMARY KEY ("id")
);
