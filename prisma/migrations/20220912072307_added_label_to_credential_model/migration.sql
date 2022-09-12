/*
  Warnings:

  - Added the required column `label` to the `credential` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "credential" ADD COLUMN     "label" TEXT NOT NULL;
