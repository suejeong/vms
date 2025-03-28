-- CreateEnum
CREATE TYPE "Category" AS ENUM ('EDU', 'SHOPPING', 'ETC');

-- CreateTable
CREATE TABLE "Customer" (
    "id" VARCHAR NOT NULL,
    "password" VARCHAR NOT NULL,
    "username" VARCHAR NOT NULL,

    CONSTRAINT "Customer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Company" (
    "id" VARCHAR NOT NULL,
    "name" VARCHAR NOT NULL,
    "introduce" VARCHAR NOT NULL,
    "category" "Category" NOT NULL,
    "investAmount" INTEGER NOT NULL,
    "profitAmount" INTEGER NOT NULL,
    "employees" INTEGER NOT NULL,
    "changedAd" TIMESTAMP(3) NOT NULL,
    "viewInvestAmount" INTEGER NOT NULL,
    "changedAdDetail" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Company_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Invest" (
    "id" VARCHAR NOT NULL,
    "investAmount" INTEGER NOT NULL,
    "state" VARCHAR NOT NULL,
    "customerId" TEXT NOT NULL,
    "companyId" TEXT NOT NULL,
    "investComment" VARCHAR NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "changedAd" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Invest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InvestDetail" (
    "investId" VARCHAR NOT NULL,
    "investComment" VARCHAR NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "changedAd" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "InvestDetail_pkey" PRIMARY KEY ("investId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Customer_id_key" ON "Customer"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Company_id_key" ON "Company"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Invest_id_key" ON "Invest"("id");

-- CreateIndex
CREATE UNIQUE INDEX "InvestDetail_investId_key" ON "InvestDetail"("investId");

-- AddForeignKey
ALTER TABLE "Invest" ADD CONSTRAINT "Invest_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Invest" ADD CONSTRAINT "Invest_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
