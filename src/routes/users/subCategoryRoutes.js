"use strict";

const express = require("express");
const router = express.Router();
const { param } = require("express-validator");
const { Msg } = require("../../utils/messageCode");
const { authenticateUser } = require("../../helpers/middleware");

const controller = require("../../controllers/subCategoryController");

/**
 * Router to find subCategory
 */
router.get(
  "/detail/:id",
  param("id").isMongoId().withMessage(Msg.INVALID_ID),
  authenticateUser,
  controller.findSubCategory
);

module.exports = router;
