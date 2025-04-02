const express = require("express");
const companyRouter = require("./company.module");
const listsRouter = require("./lists.module");
const investRouter = require("./invest.module");

const router = express.Router();

router.use("/company", companyRouter);
router.use("/lists", listsRouter);
router.use("/invest", investRouter);
module.exports = router;
