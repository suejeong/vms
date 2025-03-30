/*
  Warnings:

  - The primary key for the `Company` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Invest` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropIndex
DROP INDEX "Company_id_key";

-- DropIndex
DROP INDEX "Invest_id_key";

-- AlterTable
ALTER TABLE "Company" DROP CONSTRAINT "Company_pkey",
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "viewInvestAmount" SET DEFAULT 0,
ADD CONSTRAINT "Company_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Invest" DROP CONSTRAINT "Invest_pkey",
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Invest_pkey" PRIMARY KEY ("id");
