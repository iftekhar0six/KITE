"use strict";

const express = require("express");
const router = express.Router();
const { body, param } = require("express-validator");
const { Msg } = require("../../utils/messageCode");
const { authenticateUser } = require("../../helpers/middleware");

const controller = require("../../controllers/subCategoryController");

router.post(
  "/create",
  body("name").notEmpty().withMessage(Msg.SUBCATEGORY_NAME_REQUIRED),
  body("content").notEmpty().withMessage(Msg.SUBCATEGORY_DESCRIPTION_REQUIRED),
  body("userId").notEmpty().withMessage(Msg.SUBCATEGORY_CREATOR_REQUIRED),
  body("categoryId").notEmpty().withMessage(Msg.CATEGORY_ID_REQUIRED),
  authenticateUser,
  controller.create
);

router.get(
  "/find/:id",
  param("id").isMongoId().withMessage(Msg.INVALID_ID),
  authenticateUser,
  controller.findSubCategory
);

router.put(
  "/update/:id",
  param("id").isMongoId().withMessage(Msg.INVALID_ID),
  authenticateUser,
  controller.updateSubCategory
);

router.delete(
  "/delete/:id",
  param("id").isMongoId().withMessage(Msg.INVALID_ID),
  authenticateUser,
  controller.deleteSubCategory
);

module.exports = router;
