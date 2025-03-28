const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const categories = ["EDU", "SHOPPING", "ETC"];
const states = ["PENDING", "APPROVED", "REJECTED"];
const startupNames = [
    "위버스랩", "핀트리", "오픈케어", "슬립핏", "바이오리듬", "넥스트웨이브", "데이터브릭", "코드마인드", "리멤버", "테라폼",
    "루나소프트", "에버스핀", "픽셀릭", "하이퍼스튜디오", "블루버튼", "클랩", "리브레", "아토믹스", "스캐터랩", "코드카페",
    "셀렉트스타", "허브포인트", "트리거", "카펜트리", "그로우앤베터", "브릭시스템", "스테이폴리오", "아하", "글로랑", "로켓뷰",
    "엔트리", "포티투마루", "버즈빌", "리디", "플리토", "크라우드웍스", "스픽", "슬리드", "캐시노트", "왓챠",
    "레몬베이스", "노션랩스", "이루다", "빅밸류", "매스프레소", "에이아이바", "크래프톤", "튜닙", "브랜디", "하이퍼리즘",
    "노타", "오아시스비즈니스", "애자일소다", "젠틀에너지", "포캐스트", "센드버드", "리턴제로", "구루미", "마들렌", "스윙비",
    "스몰빅", "엔코드", "아이디케어", "비욘드펑크", "트릿지", "클로저", "두브레인", "핀다", "코드잇", "딥서치",
    "파운트", "토스랩", "래디우스랩", "요즘것들", "로지스팟", "팀스파르타", "콜로세움", "아이디어스", "펫프렌즈", "클래스101",
    "벨류맵", "리틀원", "큐피스트", "코멘토", "마이리얼트립", "호두랩스", "오픈서베이", "오롤리데이", "윌라", "비주얼캠프",
    "리디북스", "요기요", "배달의민족", "당근마켓", "번개장터", "오늘의집", "크몽", "타다", "직방", "잡플래닛"
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

    for (let i = 0; i < 100; i++) {
        const companyId = makeId("company", i + 1);
        const company = await prisma.company.create({
            data: {
                id: companyId,
                name: startupNames[i % startupNames.length],
                description: `${startupNames[i % startupNames.length]}는 혁신적인 기술 스타트업입니다. 혁신적으로 스타트하는 기업입니다. 기술을 주도하고 `,
                category: getRandomCategory(),
                totalInvestment: getRandomInt(5, 50) * 100,
                totalProfit: getRandomInt(1, 80) * 100,
                employeeCount: getRandomInt(10, 500),
                viewInvestAmount: getRandomInt(1, 10) * 100,
                countMyPicked: getRandomInt(0, 100),
                countYourPicked: getRandomInt(0, 100),
                changedAd: getRandomDateWithin30Days(),
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
                        changedAd: getRandomDateWithin30Days(),
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
