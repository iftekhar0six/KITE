"use strict";

const express = require("express");
const router = express.Router();
const { body, param } = require("express-validator");
const { Msg } = require("../../utils/messageCode");
const { authenticateUser } = require("../../helpers/middleware");

const controller = require("../../controllers/categoryController");

router.post(
  "/create",
  body("name").notEmpty().withMessage(Msg.CATEGORY_NAME_REQUIRED),
  body("description").notEmpty().withMessage(Msg.CATEGORY_DESCRIPTION_REQUIRED),
  body("userId").notEmpty().withMessage(Msg.CATEGORY_CREATOR_REQUIRED),
  authenticateUser,
  controller.create
);

router.get(
  "/find/:id",
  param("id").isMongoId().withMessage(Msg.INVALID_ID),
  authenticateUser,
  controller.findCategory
);

router.put(
  "/update/:id",
  param("id").isMongoId().withMessage(Msg.INVALID_ID),
  authenticateUser,
  controller.updateCategory
);

router.delete(
  "/delete/:id",
  param("id").isMongoId().withMessage(Msg.INVALID_ID),
  authenticateUser,
  controller.deleteCategory
);

module.exports = router;
