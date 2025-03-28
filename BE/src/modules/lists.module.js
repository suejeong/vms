const express = require('express');
const prisma = require('../db/client.prisma');
const listsRouter = express.Router();

listsRouter.get("/lists", async (req, res, next) => {
    try {
        const lists = await prisma.companys.findMany({
            select: {
                name: true,
                description: true,
                category: true,
                total_investment: true,
                total_profit: true,
                employee_count: true
            }
        })
        res.json(lists);
    } catch (e) {
        next(e);
    }
})

module.exports = listsRouter;