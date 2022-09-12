/*
  Warnings:

  - A unique constraint covering the columns `[user_id,label]` on the table `cards` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "cards" ADD COLUMN     "createdAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- CreateIndex
CREATE UNIQUE INDEX "cards_user_id_label_key" ON "cards"("user_id", "label");
