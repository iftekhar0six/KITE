"use strict";

const express = require("express");
const router = express.Router();

const controller = require("../../controllers/backend/subcategory");

router.get("/sub-category", controller.listSubCategory);

module.exports = router;
