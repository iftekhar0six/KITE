"use strict";

const express = require("express");
const router = express.Router();
const { param } = require("express-validator");
const { Msg } = require("../../utils/messageCode");
const { authenticateUser } = require("../../helpers/middleware");

const controller = require("../../controllers/categoryController");

/**
 * Router to find category
 */
router.get(
  "/detail/:id",
  param("id").isMongoId().withMessage(Msg.INVALID_ID),
  authenticateUser,
  controller.findCategory
);

module.exports = router;
