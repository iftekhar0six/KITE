"use strict";

const express = require("express");
const router = express.Router();

const controller = require("../../controllers/backend/category");

router.get("/add-category", controller.createCategory);
router.get("/category", controller.listCategory);
router.get("/deleteCategory/:id", controller.deleteCategory);
router.get("/update-category/:id", controller.update);
router.post("/update-category", controller.updateForm);

module.exports = router;
