const express = require("express");
const prisma = require("../db/client.prisma");
const bcrypt = require("bcrypt");
const investRouter = express.Router();

//투자 정보 전체 가져요기
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

//투자 정보 하나 가져오기
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
    });

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
//투자에 수정 삭제를 위한한 비밀번호만 가져오기
investRouter.post("/password/:investId", async (req, res, next) => {
  try {
    const { investId } = req.params;
    const { password } = req.body;
    const findInvest = await prisma.invest.findUnique({
      where: { id: investId },
    });
    //없으면 에러
    if (!findInvest) {
      return res.status(404).json({ message: "투자 정보를 찾을 수 없습니다." });
    }

    // 🔐 비밀번호 유효성 검사 (기존 해시된 비밀번호와 비교)
    const isPasswordValid = await bcrypt.compare(password, findInvest.password);
    if (!isPasswordValid) {
      return res.status(200).json({ message: "No" });
    }

    res.status(200).json({ message: "Yes" });
  } catch (error) {
    next(error);
  }
});

// 투자 정보 추가하기
investRouter.post("/", async (req, res, next) => {
  try {
    const { username, password, investAmount, companyId, comment } = req.body;

    // 🔐 비밀번호 암호화
    const hashedPassword = await bcrypt.hash(password, 10);

    const newInvest = await prisma.invest.create({
      data: {
        username: username,
        password: hashedPassword,
        investAmount: investAmount,
        companyId: companyId,
        comment: comment,
      },
    });

    const { password: _, ...safeData } = newInvest;
    res.status(201).json(safeData);
  } catch (error) {
    next(error);
  }
});

// 투자 정보 수정하기
investRouter.put("/:investId", async (req, res, next) => {
  try {
    const { investId } = req.params;
    const { username, password, investAmount, companyId, comment } = req.body;
    const findInvest = await prisma.invest.findUnique({
      where: { id: investId },
    });
    //없으면 에러
    if (!findInvest) {
      return res.status(404).json({ message: "투자 정보를 찾을 수 없습니다." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const updatedInvest = await prisma.invest.update({
      where: { id: investId },
      data: {
        username: username,
        password: hashedPassword,
        investAmount: investAmount,
        companyId: companyId,
        comment: comment,
      },
    });

    const { password: _, ...safeData } = updatedInvest;
    res.status(201).json(safeData);
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
