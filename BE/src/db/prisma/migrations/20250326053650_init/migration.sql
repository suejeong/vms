/*
  Warnings:

  - You are about to drop the column `changedAdDetail` on the `Company` table. All the data in the column will be lost.
  - You are about to drop the column `employees` on the `Company` table. All the data in the column will be lost.
  - You are about to drop the column `introduce` on the `Company` table. All the data in the column will be lost.
  - You are about to drop the column `investAmount` on the `Company` table. All the data in the column will be lost.
  - You are about to drop the column `profitAmount` on the `Company` table. All the data in the column will be lost.
  - You are about to drop the column `changedAd` on the `Invest` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Invest` table. All the data in the column will be lost.
  - You are about to drop the column `customerId` on the `Invest` table. All the data in the column will be lost.
  - You are about to drop the column `investComment` on the `Invest` table. All the data in the column will be lost.
  - The primary key for the `InvestDetail` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `investComment` on the `InvestDetail` table. All the data in the column will be lost.
  - You are about to drop the `Customer` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `description` to the `Company` table without a default value. This is not possible if the table is not empty.
  - Added the required column `employeeCount` to the `Company` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalInvestment` to the `Company` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalProfit` to the `Company` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `Invest` table without a default value. This is not possible if the table is not empty.
  - Added the required column `username` to the `Invest` table without a default value. This is not possible if the table is not empty.
  - Added the required column `comment` to the `InvestDetail` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Invest" DROP CONSTRAINT "Invest_customerId_fkey";

-- DropIndex
DROP INDEX "InvestDetail_investId_key";

-- AlterTable
ALTER TABLE "Company" DROP COLUMN "changedAdDetail",
DROP COLUMN "employees",
DROP COLUMN "introduce",
DROP COLUMN "investAmount",
DROP COLUMN "profitAmount",
ADD COLUMN     "countMyPicked" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "countYourPicked" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "description" VARCHAR NOT NULL,
ADD COLUMN     "employeeCount" INTEGER NOT NULL,
ADD COLUMN     "totalInvestment" INTEGER NOT NULL,
ADD COLUMN     "totalProfit" INTEGER NOT NULL,
ALTER COLUMN "changedAd" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Invest" DROP COLUMN "changedAd",
DROP COLUMN "createdAt",
DROP COLUMN "customerId",
DROP COLUMN "investComment",
ADD COLUMN     "password" VARCHAR NOT NULL,
ADD COLUMN     "username" VARCHAR NOT NULL;

-- AlterTable
ALTER TABLE "InvestDetail" DROP CONSTRAINT "InvestDetail_pkey",
DROP COLUMN "investComment",
ADD COLUMN     "comment" VARCHAR NOT NULL,
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "InvestDetail_pkey" PRIMARY KEY ("id");

-- DropTable
DROP TABLE "Customer";

-- AddForeignKey
ALTER TABLE "InvestDetail" ADD CONSTRAINT "InvestDetail_investId_fkey" FOREIGN KEY ("investId") REFERENCES "Invest"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
