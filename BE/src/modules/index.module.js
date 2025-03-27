const express = require('express');
const companiesRouter = require('./companies.module');

const router = express.Router()

router.use("/companies", companiesRouter);

module.exports = router;