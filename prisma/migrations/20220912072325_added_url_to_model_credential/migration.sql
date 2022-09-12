/*
  Warnings:

  - Added the required column `url` to the `credential` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "credential" ADD COLUMN     "url" TEXT NOT NULL;
