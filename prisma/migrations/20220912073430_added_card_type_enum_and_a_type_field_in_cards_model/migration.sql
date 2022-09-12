-- CreateEnum
CREATE TYPE "CardType" AS ENUM ('credit', 'debit', 'both');

-- AlterTable
ALTER TABLE "cards" ADD COLUMN     "type" "CardType" NOT NULL DEFAULT 'credit';
