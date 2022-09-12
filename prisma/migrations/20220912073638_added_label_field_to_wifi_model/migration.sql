/*
  Warnings:

  - Added the required column `label` to the `wifi` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "wifi" ADD COLUMN     "label" TEXT NOT NULL;
