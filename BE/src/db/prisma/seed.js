const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
    const result = await prisma.companys.createMany({
        data: [
            {
                name: "삼성전자",
                description: "글로벌 전자 기업",
                category: "edu",
                total_investmen: 1000000,
                total_profit: 3000000,
                employee_count: 50000,
                view_invest_amount: 500000,
                count_my_picked: 30,
                count_your_picked: 50,
                changed_ad: new Date()
            },
            {
                name: "네이버",
                description: "대한민국 대표 포털",
                category: "shopping",
                total_investmen: 800000,
                total_profit: 2500000,
                employee_count: 40000,
                view_invest_amount: 300000,
                count_my_picked: 20,
                count_your_picked: 60,
                changed_ad: new Date()
            }
        ],
        skipDuplicates: true
    });

    console.log("시드 결과 👉", result);
}

main()
    .then(() => {
        console.log("🌱 시드 완료!");
        return prisma.$disconnect();
    })
    .catch((e) => {
        console.error("❌ 시드 에러:", e);
        return prisma.$disconnect();
    });
