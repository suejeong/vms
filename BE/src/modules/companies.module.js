const express = require("express");
const prisma = require("../db/client.prisma");

const companiesRouter = express.Router();

// 전체 회사 리스트 가져오기
companiesRouter.get('/', async (req, res, next) => {
    try {
        const companies = await prisma.company.findMany();
        res.json(companies);
    } catch (error) {
        next(error);
    }
});

// 회사 비교하기
companiesRouter.get('/compare', async (req, res, next) => {
    try {
        const companyNameArray = req.query.name?.split(','); 
        
        if (!Array.isArray(companyNameArray) || companyNameArray.length < 1) {
            return res.status(400).json({ message: "비교할 회사를 선택해 주세요." });
        }

        const companies = await prisma.company.findMany({
            where: {
                name: { in: companyNameArray }, 
            },
        });

        if (companies.length === 0) {
            return res.status(404).json({ error: "Companies not found" });
        }

        res.json(companies);
    } catch (error) {
        next(error);
    }
});

// 순위 가져오기
companiesRouter.get('/ranking/:companyName', async (req, res, next) => {
    try {
        const companyName = req.params.companyName;
        const sortOption = req.query.orderBy || '누적 투자금액 높은순';

        if (!companyName) {
            return res.status(400).json({ message: "유효한 회사 이름을 제공해야 합니다." });
        }

        const sortOptionMapping = {
            "누적 투자금액 높은순": "total_investment_desc",
            "누적 투자금액 낮은순": "total_investment_asc",
            "매출액 높은순": "total_profit_desc",
            "매출액 낮은순": "total_profit_asc",
            "고용 인원 많은순": "employee_count_desc",
            "고용 인원 적은순": "employee_count_asc"
        };

        const sortOptionKey = sortOptionMapping[sortOption];
        if (!sortOptionKey) {
            return res.status(400).json({ message: "유효한 정렬 옵션을 제공해야 합니다." });
        }
        
        const parts = sortOptionKey.split('_');
        const sortBy = parts.slice(0, -1).join('_'); 
        const order = parts[parts.length - 1]; 
        
        const companies = await prisma.company.findMany({
            orderBy: {
                [sortBy]: order
            }
        });
    
        const index = companies.findIndex(company => company.name.toLowerCase() === companyName.toLowerCase());

        if (index === -1) {
            return res.status(404).json({ message: "회사를 찾을 수 없습니다." });
        }
    
        const rankedCompanies = companies.slice(
            Math.max(0, index - 2), 
            Math.min(companies.length, index + 3)
        );

        res.json(rankedCompanies);
    } catch (error) {
        next(error);
    }
});

module.exports = companiesRouter;
