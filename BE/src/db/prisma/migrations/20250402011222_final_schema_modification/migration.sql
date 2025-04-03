/*
  Warnings:

  - You are about to drop the column `state` on the `Invest` table. All the data in the column will be lost.
  - You are about to drop the `InvestDetail` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "InvestDetail" DROP CONSTRAINT "InvestDetail_investId_fkey";

-- AlterTable
ALTER TABLE "Invest" DROP COLUMN "state",
ADD COLUMN     "comment" VARCHAR NOT NULL DEFAULT '';

-- DropTable
DROP TABLE "InvestDetail";