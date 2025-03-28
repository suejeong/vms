-- CreateEnum
CREATE TYPE "Category" AS ENUM ('EDU', 'SHOPPING', 'ETC');

-- CreateTable
CREATE TABLE "Company" (
    "id" VARCHAR NOT NULL,
    "name" VARCHAR NOT NULL,
    "description" VARCHAR NOT NULL,
    "category" "Category" NOT NULL,
    "totalInvestment" INTEGER NOT NULL,
    "totalProfit" INTEGER NOT NULL,
    "employeeCount" INTEGER NOT NULL,
    "viewInvestAmount" INTEGER NOT NULL,
    "countMyPicked" INTEGER NOT NULL DEFAULT 0,
    "countYourPicked" INTEGER NOT NULL DEFAULT 0,
    "changedAd" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Company_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Invest" (
    "id" VARCHAR NOT NULL,
    "username" VARCHAR NOT NULL,
    "password" VARCHAR NOT NULL,
    "companyId" TEXT NOT NULL,
    "investAmount" INTEGER NOT NULL,
    "state" VARCHAR NOT NULL,

    CONSTRAINT "Invest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InvestDetail" (
    "id" SERIAL NOT NULL,
    "investId" VARCHAR NOT NULL,
    "comment" VARCHAR NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "changedAd" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "InvestDetail_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Company_id_key" ON "Company"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Invest_id_key" ON "Invest"("id");

-- AddForeignKey
ALTER TABLE "Invest" ADD CONSTRAINT "Invest_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InvestDetail" ADD CONSTRAINT "InvestDetail_investId_fkey" FOREIGN KEY ("investId") REFERENCES "Invest"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
