"use strict";

const express = require("express");
const router = express.Router();
const { body, param } = require("express-validator");
const { Msg } = require("../../utils/messageCode");
const { authenticateAdmin } = require("../../helpers/middleware");

const controller = require("../../controllers/subCategoryController");

router.post(
  "/create",
  body("name").notEmpty().withMessage(Msg.SUBCATEGORY_NAME_REQUIRED),
  body("content").notEmpty().withMessage(Msg.SUBCATEGORY_DESCRIPTION_REQUIRED),
  body("userId").notEmpty().withMessage(Msg.SUBCATEGORY_CREATOR_REQUIRED),
  body("categoryId").notEmpty().withMessage(Msg.SUBCATEGORY_ID_REQUIRED),
  authenticateAdmin,
  controller.create
);

router.get(
  "/find/:id",
  param("id").isMongoId().withMessage(Msg.INVALID_ID),
  authenticateAdmin,
  controller.findSubCategory
);

router.get("/list", authenticateAdmin, controller.listSubCategory);

router.put(
  "/update/:id",
  param("id").isMongoId().withMessage(Msg.INVALID_ID),
  authenticateAdmin,
  controller.updateSubCategory
);

router.delete(
  "/delete/:id",
  param("id").isMongoId().withMessage(Msg.INVALID_ID),
  authenticateAdmin,
  controller.deleteSubCategory
);

module.exports = router;
