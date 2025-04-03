const express = require("express");
const prisma = require("../db/client.prisma");

const investRouter = express.Router();

//투정정보 전체 가져요기
investRouter.get("/", async (req, res, next) => {
  try {
    const invests = await prisma.invest.findMany();
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
investRouter.get("/:investId", async (req, res, next) => {
  try {
    const { investId } = req.params;

    const invest = await prisma.invest.findUnique({
      where: { id: investId },
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
      where: { companyId: companyId },
      orderBy: {
        investmentAmount: "desc", // 투자금액을 기준으로 내림차순 정렬
      },
    });

    if (invests.length === 0) {
      //이거 빈배열 반환으로 바꾸기
      return [];
    }

    res.json(invests);
  } catch (error) {
    next(error);
  }
});

//특정 기업 투자정보 5개 가져오기
investRouter.get("/company/:companyId/:page", async (req, res, next) => {
  try {
    const { companyId, page } = req.params;
    const pageNumber = parseInt(page, 10);
    const pageSize = 5;
    const skip = (pageNumber - 1) * pazeSize;

    const invests = await prisma.invest.findMany({
      where: { companyId: companyId },
      skip: skip,
      take: pageSize,
      orderBy: {
        investmentAmount: "desc", // 투자금액을 기준으로 내림차순 정렬
      },
    });

    // 해당 회사의 투자 정보가 없으면 404 반환 //이거 빈배열 반환으로 바꾸기
    if (invests.length === 0) {
      return [];
    }

    res.json(invests);
  } catch (error) {
    next(error);
  }
});

// 투자 정보 추가하기
investRouter.post("/", async (req, res, next) => {
  try {
    const Investdata = req.body;

    const newInvest = await prisma.invest.create({
      data: {
        username: Investdata.username,
        password: Investdata.password,
        investAmount: Investdata.investAmount,
        companyId: Investdata.companyId,
        comment: Investdata.comment,
      },
    });

    res.status(201).json(newInvest);
  } catch (error) {
    next(error);
  }
});

// 투자 정보 수정하기
investRouter.put("/:investId", async (req, res, next) => {
  try {
    const { investId } = req.params;
    const Investdata = req.body;
    const findInvest = await prisma.invest.findUnique({
      where: { id: investId },
    });
    //없으면 에러
    if (!findInvest) {
      return res.status(404).json({ message: "투자 정보를 찾을 수 없습니다." });
    }

    const updatedInvest = await prisma.invest.update({
      where: { id: investId },
      data: {
        username: Investdata.username,
        password: Investdata.password,
        investAmount: Investdata.investAmount,
        companyId: Investdata.companyId,
        comment: Investdata.comment,
      },
    });

    res.json(updatedInvest);
  } catch (error) {
    next(error);
  }
});

// 투자 정보 삭제하기
investRouter.delete("/:investId", async (req, res, next) => {
  try {
    const { investId } = req.params;

    //삭제 할 투자 정보 조회
    const findInvest = await prisma.invest.findUnique({
      where: { id: investId },
    });
    //없으면 에러
    if (!findInvest) {
      return res.status(404).json({ message: "투자 정보를 찾을 수 없습니다." });
    }

    // 투자 정보 삭제
    await prisma.invest.delete({
      where: { id: investId },
    });
    res.json({ message: "투자 정보가 삭제되었습니다." });
  } catch (error) {
    next(error);
  }
});

module.exports = investRouter;
