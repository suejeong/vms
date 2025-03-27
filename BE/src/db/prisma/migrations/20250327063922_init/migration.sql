-- CreateEnum
CREATE TYPE "Category" AS ENUM ('edu', 'shopping', 'game', 'etc');

-- CreateTable
CREATE TABLE "Company" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "category" "Category" NOT NULL,
    "total_investment" INTEGER NOT NULL,
    "total_profit" INTEGER NOT NULL,
    "employee_count" INTEGER NOT NULL,
    "view_invest_amount" INTEGER NOT NULL DEFAULT 0,
    "count_my_picked" INTEGER NOT NULL DEFAULT 0,
    "count_your_picked" INTEGER NOT NULL DEFAULT 0,
    "changed_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Company_pkey" PRIMARY KEY ("id")
);
