/*
  Warnings:

  - A unique constraint covering the columns `[user_id,label]` on the table `credential` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "credential" ADD COLUMN     "createdAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- CreateIndex
CREATE UNIQUE INDEX "credential_user_id_label_key" ON "credential"("user_id", "label");
