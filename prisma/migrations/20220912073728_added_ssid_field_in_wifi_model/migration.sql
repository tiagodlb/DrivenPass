/*
  Warnings:

  - Added the required column `ssid` to the `wifi` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "wifi" ADD COLUMN     "ssid" TEXT NOT NULL;
