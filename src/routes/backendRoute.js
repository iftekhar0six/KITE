"use strict";

const express = require("express");
const router = express.Router();

router.use("/", require("./backend/user"));
router.use("/", require("./backend/category"));

module.exports = router;
