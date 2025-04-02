const express = require("express");
const prisma = require("../db/client.prisma");

const companyRouter = express.Router();

// 전체 회사 리스트 가져오기
companyRouter.get("/", async (req, res, next) => {
  try {
    const company = await prisma.company.findMany();
    res.json(company);
  } catch (error) {
    next(error);
  }
});

// 회사 하나 정보로 가져오기
companyRouter.get("/detail/:companyID", async (req, res, next) => {
  const { companyID } = req.params;
  try {
    const company = await prisma.company.findUnique({
      where: { companyID },
    });
    res.json(company);
  } catch (error) {
    next(error);
  }
});

// 회사 비교하기
companyRouter.get("/compare", async (req, res, next) => {
  try {
    const companyNameArray = req.query.name?.split(",");

    const company = await prisma.company.findMany({
      where: {
        name: { in: companyNameArray },
      },
    });

    if (company.length === 0) {
      return res.status(404).json({ error: "company not found" });
    }

    res.json(company);
  } catch (error) {
    next(error);
  }
});

// 회사 순위로 리스트 가져오기
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

    // 위아래 2개씩 가져오기
    const surroundingcompany = rankedcompany.slice(
      Math.max(0, targetIndex - 2),
      Math.min(rankedcompany.length, targetIndex + 3)
    );

    res.json(surroundingcompany);
  } catch (error) {
    next(error);
  }
});

//전체기업에 대한 viewInvestAmount업데이트
//강사님께서 투자 투자수정 투자삭제마다 뷰마이스타트업에서 받은 투자금을 건들지말고
//뷰마이스타트업에서 받은 투자금 불러오는 페이지에서 처리하라고 하셔서
//투자현황 페이지 만드시는 분이 이거 호출하시거나 변형하셔서 쓰시면 될거같습니다.
companyRouter.get("/view", async (req, res, next) => {
  //경로는 나중에 수정하세요
  try {
    //전체 회사 목록 가져오기
    const companies = await prisma.company.findMany();

    //각 회사의 투자 총액을 계산하여 업데이트
    for (const company of companies) {
      // 투자 총액 조회
      const companyViewInvests = await prisma.invest.findMany({
        where: {
          companyId: company.id,
        },
        select: {
          investAmount: true,
        },
      });

      // 투자 금액 합산
      const companyViewInvestTotal = companyViewInvests.reduce(
        (total, invest) => total + invest.investAmount,
        0
      );

      // 회사 테이블의 viewInvestAmount 업데이트
      await prisma.company.update({
        where: { id: company.id },
        data: {
          viewInvestAmount: companyViewInvestTotal,
        },
      });
    }

    const updatedCompany = await prisma.company.findMany();

    res.json(updatedCompany);
  } catch (error) {
    next(error);
  }
});

module.exports = companyRouter;
