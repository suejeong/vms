const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function seedData() {
  try {
    // 1. 모든 데이터 삭제 (연관 관계에 맞게 순서대로)
    await prisma.investDetail.deleteMany();
    await prisma.invest.deleteMany();
    await prisma.company.deleteMany();

    // 2. 새로운 더미 데이터 추가 (description을 매우 길게 설정)
    const longDescription = `
      This company specializes in providing cutting-edge solutions that revolutionize the industry. 
      With a focus on innovation, creativity, and efficiency, we are committed to delivering top-notch products 
      and services to our clients. Our mission is to inspire and empower businesses to thrive in a fast-paced, 
      ever-changing environment. Our team of experts works tirelessly to research, develop, and implement strategies 
      that meet the unique challenges of the modern world. Whether you are looking to enhance your digital presence, 
      optimize operational processes, or foster sustainable growth, we have the expertise to guide you every step of the way.
      Join us as we redefine the future of technology and innovation.
    `;

    const companies = Array.from({ length: 50 }).map((_, index) => ({
      id: `co${index + 1}`,
      name: `Company ${index + 1}`,
      description: longDescription,
      category: index % 3 === 0 ? 'EDU' : index % 3 === 1 ? 'SHOPPING' : 'ETC',
      totalInvestment: Math.floor(Math.random() * 10000000),
      totalProfit: Math.floor(Math.random() * 5000000),
      employeeCount: Math.floor(Math.random() * 1000),
      viewInvestAmount: Math.floor(Math.random() * 1000000),
      countMyPicked: Math.floor(Math.random() * 10000),
      countYourPicked: Math.floor(Math.random() * 10000),
      changedAd: new Date(),
    }));

    await prisma.company.createMany({
      data: companies,
    });

    console.log('✅ Seed 데이터 추가 완료!');
  } catch (error) {
    console.error('❌ Seed 오류:', error.message);
  } finally {
    await prisma.$disconnect();
  }
}

seedData();
