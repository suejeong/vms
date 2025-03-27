const { PrismaClient } = require('@prisma/client');
const { randomUUID } = require('crypto');
const prisma = new PrismaClient();

async function main() {
    const companies = [
        {
            name: 'Naver',
            description: '한국의 초록창 네이버 입니다',
            category: 'etc',
            total_investment: 1000000,
            total_profit: 1000000,
            employee_count: 3000,
            view_invest_amount: 30000000,
            count_my_picked: 164,
            count_your_picked: 551,
            changed_at: new Date('2000-01-01T01:01:01'),
        },
        {
            name: 'Google',
            description: '전세계 공용 포털사이트',
            category: 'shopping',
            total_investment: 20000000,
            total_profit: 20000000,
            employee_count: 67000,
            view_invest_amount: 770000000,
            count_my_picked: 314,
            count_your_picked: 1851,
            changed_at: new Date('2000-02-02T02:02:02'),
        },
        {
            name: '코드잇',
            description: '풀스택 ㅎㅇㅌ',
            category: 'edu',
            total_investment: 500000,
            total_profit: 600000,
            employee_count: 113,
            view_invest_amount: 765000,
            count_my_picked: 32,
            count_your_picked: 41,
            changed_at: new Date('2000-03-03T03:03:03'),
        },
        {
            name: 'Discord',
            description: '실시간 커뮤니케이션',
            category: 'etc',
            total_investment: 6780000,
            total_profit: 3450000,
            employee_count: 263,
            view_invest_amount: 8765000,
            count_my_picked: 333,
            count_your_picked: 235,
            changed_at: new Date('2000-04-04T04:04:04'),
        },
        {
            name: 'Stream',
            description: '게임모음',
            category: 'game',
            total_investment: 7770000,
            total_profit: 5550000,
            employee_count: 183,
            view_invest_amount: 7777000,
            count_my_picked: 288,
            count_your_picked: 399,
            changed_at: new Date('2000-05-05T05:05:05'),
        },
        {
            name: 'Notion',
            description: '간편한 메모장',
            category: 'etc',
            total_investment: 123456789,
            total_profit: 234567890,
            employee_count: 43,
            view_invest_amount: 67891230,
            count_my_picked: 10,
            count_your_picked: 21,
            changed_at: new Date('2000-06-06T06:06:06'),
        }
    ];

    for (const company of companies) {
        await prisma.company.create({
            data: company,
        });
    }

    console.log('Seed data added');
}

main()
    .catch(e => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
