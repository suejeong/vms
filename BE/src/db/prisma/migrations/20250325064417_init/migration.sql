-- CreateEnum
CREATE TYPE "category" AS ENUM ('edu', 'shopping', 'etc');

-- CreateTable
CREATE TABLE "companys" (
    "id" SERIAL NOT NULL,
    "name" INTEGER NOT NULL,
    "description" INTEGER NOT NULL,
    "category" "category" NOT NULL,
    "total_investmen" INTEGER NOT NULL,
    "total_profit" INTEGER NOT NULL,
    "employee_count" INTEGER NOT NULL,
    "view_invest_amount" INTEGER NOT NULL,
    "count_my_picked" INTEGER NOT NULL,
    "count_your_picked" INTEGER NOT NULL,
    "changed_ad" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "companys_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "invests" (
    "id" SERIAL NOT NULL,
    "username" INTEGER NOT NULL,
    "password" INTEGER NOT NULL,
    "invest_amount" INTEGER NOT NULL,
    "state" INTEGER NOT NULL,
    "companysId" INTEGER NOT NULL,

    CONSTRAINT "invests_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "invest_detail" (
    "id" SERIAL NOT NULL,
    "comment" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "changed_ad" TIMESTAMP(3) NOT NULL,
    "investsId" INTEGER NOT NULL,

    CONSTRAINT "invest_detail_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "invests" ADD CONSTRAINT "invests_companysId_fkey" FOREIGN KEY ("companysId") REFERENCES "companys"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "invest_detail" ADD CONSTRAINT "invest_detail_investsId_fkey" FOREIGN KEY ("investsId") REFERENCES "invests"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
