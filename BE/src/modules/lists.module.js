const express = require('express');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const listsRouter = express.Router();

listsRouter.get("/", async (req, res, next) => {
    try {
        const lists = await prisma.company.findMany({
            select: {
                id: true,
                name: true,
                description: true,
                category: true,
                totalInvestment: true,
                totalProfit: true,
                employeeCount: true
            }
        })
        res.json(lists);
    } catch (e) {
        next(e);
    }
})

module.exports = listsRouter;