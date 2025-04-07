/*
  Warnings:

  - Changed the type of `category` on the `Company` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Company" DROP COLUMN "category",
ADD COLUMN     "category" VARCHAR NOT NULL;

-- DropEnum
DROP TYPE "Category";
