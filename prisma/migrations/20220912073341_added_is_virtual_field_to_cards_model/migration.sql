/*
  Warnings:

  - Added the required column `is_virtual` to the `cards` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "cards" ADD COLUMN     "is_virtual" BOOLEAN NOT NULL;
