-- CreateTable
CREATE TABLE "secureNote" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "secureNote_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "secureNote" ADD CONSTRAINT "secureNote_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
