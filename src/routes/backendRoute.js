"use strict";

const express = require("express");
const router = express.Router();

router.use("/", require("./backend/user"));
router.use("/", require("./backend/category"));
// router.use("/", require("./backend/auth"));

module.exports = router;
