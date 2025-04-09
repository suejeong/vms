const express = require("express");
const prisma = require("../db/client.prisma");

const companyRouter = express.Router();

// 전체 회사 리스트 가져오기 API
companyRouter.get("/", async (req, res, next) => {
  try {
    const company = await prisma.company.findMany();
    res.json(company);
  } catch (error) {
    next(error);
  }
});

// 회사 하나 정보로 가져오기 API
companyRouter.get("/detail/:companyId", async (req, res, next) => {
  const { companyId } = req.params;
  try {
    const company = await prisma.company.findUnique({
      where: { id: companyId },
    });
    res.json(company);
  } catch (error) {
    next(error);
  }
});

// 회사 비교하기 API
companyRouter.get("/compare/:myCompanyId", async (req, res, next) => {
  try {
    const { myCompanyId } = req.params;
    const compareCompanyIdsArray = req.query.compareCompanyIds?.split(",");

    const updateTasks = [];

    // 내 기업
    updateTasks.push(
      prisma.company.update({
        where: { id: myCompanyId },
        data: { countMyPicked: { increment: 1 } },
      })
    );

    // 비교 기업
    for (const companyId of compareCompanyIdsArray) {
      updateTasks.push(
        prisma.company.update({
          where: { id: companyId },
          data: { countYourPicked: { increment: 1 } },
        })
      );
    }

    const updatedCompanies = await Promise.all(updateTasks);

    res.json(updatedCompanies);
  } catch (error) {
    next(error);
  }
});

// 회사 순위로 리스트 가져오기 API
companyRouter.get("/ranking/:companyName", async (req, res, next) => {
  try {
    const companyName = req.params.companyName;
    const sortOption = req.query.orderBy || "누적 투자금액 높은순";

    if (!companyName) {
      return res
        .status(400)
        .json({ message: "유효한 회사 이름을 제공해야 합니다." });
    }

    // 정렬 옵션 매핑
    const sortOptionMapping = {
      "누적 투자금액 높은순": "totalInvestment_desc",
      "누적 투자금액 낮은순": "totalInvestment_asc",
      "매출액 높은순": "totalProfit_desc",
      "매출액 낮은순": "totalProfit_asc",
      "고용 인원 많은순": "employeeCount_desc",
      "고용 인원 적은순": "employeeCount_asc",
    };

    const sortOptionKey = sortOptionMapping[sortOption];
    if (!sortOptionKey) {
      return res
        .status(400)
        .json({ message: "유효한 정렬 옵션을 제공해야 합니다." });
    }

    // 정렬 기준 및 순서 설정
    const [sortBy, order] = sortOptionKey.split("_");

    // 전체 정렬된 회사 리스트 가져오기
    const company = await prisma.company.findMany({
      orderBy: {
        [sortBy]: order,
      },
    });

    // 각 회사에 순위 추가
    const rankedcompany = company.map((company, index) => ({
      ...company,
      ranking: index + 1, // 1부터 시작하는 순위
    }));

    // 요청한 회사의 순위 찾기
    const targetIndex = rankedcompany.findIndex(
      (company) => company.name.toLowerCase() === companyName.toLowerCase()
    );
    if (targetIndex === -1) {
      return res.status(404).json({ message: "회사를 찾을 수 없습니다." });
    }

    const totalLength = rankedcompany.length;
    let startIndex = targetIndex - 2;
    let endIndex = targetIndex + 3;

    if (targetIndex < 2) {
      // 상위권 (3보다 작을 경우. 1등,2등)
      startIndex = 0;
      endIndex = Math.min(5, totalLength);
    } else if (targetIndex > totalLength - 3) {
      // 하위권 (뒤에서 1,2등)
      endIndex = totalLength;
      startIndex = Math.max(0, totalLength - 5);
    }

    const surroundingcompany = rankedcompany.slice(startIndex, endIndex);

    res.json(surroundingcompany);
  } catch (error) {
    next(error);
  }
});

// 투자 기업 리스트 가져오기 API
companyRouter.get("/view", async (req, res, next) => {
  try {
    const companies = await prisma.$queryRaw`
        SELECT 
            c.*, 
            COALESCE(SUM(i."investAmount"), 0) AS "viewTotalInvestAmount"
        FROM "Company" c
        LEFT JOIN "Invest" i ON c.id = i."companyId"
        GROUP BY c.id
        HAVING SUM(i."investAmount") > 0
    `;

    // BigInt를 Number로 변환
    const formattedCompanies = companies.map((company) => ({
      ...company,
      viewTotalInvestAmount: Number(company.viewTotalInvestAmount), // BigInt -> Number 변환
    }));

    res.json(formattedCompanies);
  } catch (error) {
    next(error);
  }
});

// 검색창 API 가져오기
companyRouter.get("/search", async (req, res, next) => {
  try {
    const searchQuery = req.query.search || "";
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const orderBy = req.query.orderBy || "orderByName_asc";
    const excludeId = req.query.excludeId || null; // 제외할 회사 아이디

    const offset = (page - 1) * limit;

    const whereCondition = {
      OR: [
        { name: { contains: searchQuery, mode: "insensitive" } },
        { category: { contains: searchQuery, mode: "insensitive" } },
      ],
    };

    // 제외할 회사 이름이 있는 경우 조건 추가
    if (excludeId) {
      whereCondition.NOT = { id: excludeId };
    }

    const sortMapping = {
      orderByName_asc: { name: "asc" },
      totalProfit_desc: { totalProfit: "desc" },
      totalProfit_asc: { totalProfit: "asc" },
      totalInvestment_desc: { totalInvestment: "desc" },
      totalInvestment_asc: { totalInvestment: "asc" },
      employeeCount_desc: { employeeCount: "desc" },
      employeeCount_asc: { employeeCount: "asc" },
      countMyPicked_desc: { countMyPicked: "desc" },
      countMyPicked_asc: { countMyPicked: "asc" },
      countYourPicked_desc: { countYourPicked: "desc" },
      countYourPicked_asc: { countYourPicked: "asc" },
    };

    const companies = await prisma.company.findMany({
      where: whereCondition,
      skip: offset,
      take: limit,
      orderBy: sortMapping[orderBy],
    });

    const totalCompanies = await prisma.company.count({
      where: whereCondition,
    });

    const totalPages = Math.ceil(totalCompanies / limit);

    res.json({
      data: companies,
      pagination: {
        currentPage: page,
        totalPages,
        totalCompanies,
        limit,
        orderBy,
      },
    });
  } catch (error) {
    next(error);
  }
});

module.exports = companyRouter;
