"use strict";

const express = require("express");
const router = express.Router();

const categoryController = require("../../controllers/backend/category");

router.get("/add-category", categoryController.createCategory);
router.get("/category", categoryController.listCategory);
router.get("/deleteCategory/:id", categoryController.deleteCategory);
router.get("/update-category/:id", categoryController.findCategory);
router.get("/update-category", categoryController.updateCategory);

module.exports = router;
