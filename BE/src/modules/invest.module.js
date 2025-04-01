const express = require("express");
const prisma = require("../db/client.prisma");

const investRouter = express.Router();

//투정정보 전체 가져요기
investRouter.get("/", async (req, res, next) => {
  try {
    const invests = await prisma.invest.findMany({
      include: {
        investDetails: true, // 투자 세부 정보도 포함 코멘트때문에 -> invest
        //각 투자(Invest)에 연결된 InvestDetail 데이터가 investDetails 배열로 포함됨
      },
    });
    if (invests.length === 0) {
      return res
        .status(404)
        .json({ message: "해당 회사의 투자 정보를 찾을 수 없습니다." });
    }

    res.json(invests);
  } catch (error) {
    next(error);
  }
});

//투정정보 하나 가져오기
investRouter.get("/investId", async (req, res, next) => {
  try {
    const { investId } = req.params;

    const invest = await prisma.invest.findUnique({
      where: { investId },
      select: {
        id: true,
        username: true,
        investAmount: true,
        state: true,
        company: true,
        investDetails: {
          select: {
            comment: true,
            createdAt: true,
            changedAt: true,
          },
        },
      },
    });

    if (invest.length === 0) {
      return res
        .status(404)
        .json({ message: "해당 회사의 투자 정보를 찾을 수 없습니다." });
    }

    res.json(invest);
  } catch (error) {
    next(error);
  }
});

//특정 기업 투자정보 가져오기
investRouter.get("/company/:companyId", async (req, res, next) => {
  try {
    const { companyId } = req.params;

    const invests = await prisma.invest.findMany({
      where: { companyId },
      select: {
        id: true,
        username: true,
        investAmount: true,
        state: true,
        company: true,
        investDetails: {
          select: {
            comment: true,
            createdAt: true,
            changedAt: true,
          },
        },
      },
    });

    if (invests.length === 0) {
      return res
        .status(404)
        .json({ message: "해당 회사의 투자 정보를 찾을 수 없습니다." });
    }

    res.json(invests);
  } catch (error) {
    next(error);
  }
});

module.exports = investRouter;
