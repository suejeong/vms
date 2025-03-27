/*
  Warnings:

  - You are about to drop the column `total_investmen` on the `companys` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "companys" DROP COLUMN "total_investmen",
ADD COLUMN     "total_investment" INTEGER NOT NULL DEFAULT 0,
ALTER COLUMN "name" SET DEFAULT '',
ALTER COLUMN "description" SET DEFAULT '',
ALTER COLUMN "total_profit" SET DEFAULT 0,
ALTER COLUMN "employee_count" SET DEFAULT 0,
ALTER COLUMN "view_invest_amount" SET DEFAULT 0,
ALTER COLUMN "count_my_picked" SET DEFAULT 0,
ALTER COLUMN "count_your_picked" SET DEFAULT 0;

-- AlterTable
ALTER TABLE "invests" ALTER COLUMN "invest_amount" SET DEFAULT 0;
