const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const categories = ["EDU", "SHOPPING", "ETC"];
const states = ["PENDING", "APPROVED", "REJECTED"];
const startupNames = [
    "위버스랩", "마이리얼트립", "클래스101", "리디북스", "타다", "리멤버",
    "잡플래닛", "팀스파르타", "네이버", "크몽", "요기요", "스캐터랩",
    "배달의민족", "버즈빌", "리디", "토스", "스픽", "캐시노트",
    "당근마켓", "직방", "매스프레소", "왓챠", "크래프톤", "브랜디",
    "아이디어스", "오늘의집", "카카오", "쿠팡", "오픈서베이", "번개장터"
];

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomCategory() {
    return categories[Math.floor(Math.random() * categories.length)];
}

function getRandomState() {
    return states[Math.floor(Math.random() * states.length)];
}

function getRandomDateWithin30Days() {
    const now = new Date();
    const past = new Date(now.getTime() - getRandomInt(0, 30) * 24 * 60 * 60 * 1000);
    return past;
}

function makeId(prefix, index) {
    return `${prefix}-${String(index).padStart(3, "0")}`;
}

async function main() {
    // 기존 데이터를 삭제하고 재 생성할 수 있는 코드입니다.
    // console.log("🔥 기존 데이터 삭제 중...");
    // await prisma.investDetail.deleteMany();
    // await prisma.invest.deleteMany();
    // await prisma.company.deleteMany();

    console.log("🌱 시드 시작");

    function makeDescription(name) {
        const phrases = [
            "는 혁신적인 기술을 기반으로 한 스타트업입니다.",
            "는 시장을 선도하는 제품을 제공합니다.",
            "는 사용자 중심의 서비스를 개발하고 있습니다.",
            "는 빠르게 성장하고 있는 기업입니다.",
            "는 차별화된 전략으로 투자자들의 주목을 받고 있습니다.",
            "는 사회적 가치를 추구하는 기업입니다.",
            "는 최신 기술을 접목해 새로운 경험을 제공합니다.",
            "는 데이터 기반의 의사결정을 통해 성장하고 있습니다."
        ];

        const randomSentences = Array.from({ length: getRandomInt(2, 3) }, () =>
            phrases[Math.floor(Math.random() * phrases.length)]
        );

        return `${name}${randomSentences.join(" ")}`;
    }


    for (let i = 0; i < 100; i++) {
        const companyId = makeId("company", i + 1);
        const company = await prisma.company.create({
            data: {
                id: companyId,
                name: startupNames[i % startupNames.length],
                description: makeDescription(startupNames[i % startupNames.length]),
                category: getRandomCategory(),
                totalInvestment: getRandomInt(5, 50) * 100,
                totalProfit: getRandomInt(1, 80) * 100,
                employeeCount: getRandomInt(10, 500),
                viewInvestAmount: getRandomInt(1, 10) * 100,
                countMyPicked: getRandomInt(0, 100),
                countYourPicked: getRandomInt(0, 100),
                changedAt: getRandomDateWithin30Days(),
            },
        });

        const investCount = getRandomInt(1, 3);

        for (let j = 0; j < investCount; j++) {
            const investId = makeId(`invest-${i + 1}`, j + 1);
            const invest = await prisma.invest.create({
                data: {
                    id: investId,
                    username: `user${getRandomInt(1, 1000)}`,
                    password: `pass${getRandomInt(1000, 9999)}`,
                    companyId: company.id,
                    investAmount: getRandomInt(1, 10) * 100,
                    state: getRandomState(),
                },
            });

            const detailCount = getRandomInt(1, 2);

            for (let k = 0; k < detailCount; k++) {
                await prisma.investDetail.create({
                    data: {
                        investId: invest.id,
                        comment: `투자 코멘트 ${k + 1} - ${startupNames[i % startupNames.length]}`,
                        createdAt: getRandomDateWithin30Days(),
                        changedAt: getRandomDateWithin30Days(),
                    },
                });
            }
        }

        console.log(`✅ ${i + 1}/100: ${company.name} 등록 완료`);
    }

    console.log("🌱 전체 시드 완료!");
}

main()
    .catch((e) => {
        console.error("❌ 시드 에러:", e);
        return prisma.$disconnect();
    })
    .finally(async () => {
        await prisma.$disconnect();
    });