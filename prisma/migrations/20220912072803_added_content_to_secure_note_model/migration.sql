/*
  Warnings:

  - Added the required column `content` to the `secureNote` table without a default value. This is not possible if the table is not empty.
  - Added the required column `label` to the `secureNote` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "secureNote" ADD COLUMN     "content" VARCHAR(1000) NOT NULL,
ADD COLUMN     "label" VARCHAR(50) NOT NULL;
