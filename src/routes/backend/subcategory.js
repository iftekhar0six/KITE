"use strict";

const express = require("express");
const router = express.Router();

const controller = require("../../controllers/backend/subcategory");

router.get("/sub-category", controller.listSubCategory);

router.get("/deleteSubCategory/:id", controller.deleteSubCategory);
router.get("/update-subcategory/:id", controller.update);


module.exports = router;
