const express = require('express');
const companiesRouter = require('./companies.module');
const listsRouter = require('./lists.module')

const router = express.Router();

router.use("/companies", companiesRouter);
router.use("/lists", listsRouter);

module.exports = router;
