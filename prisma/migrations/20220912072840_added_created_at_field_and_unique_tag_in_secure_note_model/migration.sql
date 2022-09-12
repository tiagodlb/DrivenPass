/*
  Warnings:

  - A unique constraint covering the columns `[user_id,label]` on the table `secureNote` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "secureNote" ADD COLUMN     "createdAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- CreateIndex
CREATE UNIQUE INDEX "secureNote_user_id_label_key" ON "secureNote"("user_id", "label");
