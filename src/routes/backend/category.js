"use strict";

const express = require("express");
const router = express.Router();


const categoryController = require("../../controllers/backend/category");

router.get("/add-category", categoryController.createCategory);




module.exports = router;
