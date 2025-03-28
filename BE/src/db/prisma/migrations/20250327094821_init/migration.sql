/*
  Warnings:

  - The primary key for the `companys` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "invests" DROP CONSTRAINT "invests_companysId_fkey";

-- AlterTable
ALTER TABLE "companys" DROP CONSTRAINT "companys_pkey",
ALTER COLUMN "id" SET DEFAULT '',
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "companys_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "companys_id_seq";

-- AlterTable
ALTER TABLE "invests" ALTER COLUMN "companysId" SET DATA TYPE TEXT;

-- AddForeignKey
ALTER TABLE "invests" ADD CONSTRAINT "invests_companysId_fkey" FOREIGN KEY ("companysId") REFERENCES "companys"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
