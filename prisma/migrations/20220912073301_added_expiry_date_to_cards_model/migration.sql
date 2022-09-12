/*
  Warnings:

  - Added the required column `expiry_date` to the `cards` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "cards" ADD COLUMN     "expiry_date" TEXT NOT NULL;
