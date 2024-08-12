"use strict";

const express = require("express");
const router = express.Router();
const { body, param } = require("express-validator");
const { Msg } = require("../../utils/messageCode");
const { authenticateAdmin } = require("../../helpers/middleware");

const controller = require("../../controllers/subCategoryController");

/**
 * Router to create subCategory
 */
router.post(
  "/create",
  body("name").notEmpty().withMessage(Msg.SUBCATEGORY_NAME_REQUIRED),
  body("content").notEmpty().withMessage(Msg.SUBCATEGORY_DESCRIPTION_REQUIRED),
  body("categoryId").notEmpty().withMessage(Msg.SUBCATEGORY_ID_REQUIRED),
  authenticateAdmin,
  controller.create
);

/**
 * Router to find subCategory
 */
router.get(
  "/detail/:id",
  param("id").isMongoId().withMessage(Msg.INVALID_ID),
  authenticateAdmin,
  controller.findSubCategory
);

/**
 * Router to list subCategory
 */
router.get("/list", authenticateAdmin, controller.listSubCategory);

/**
 * Router to update subCategory
 */
router.put(
  "/update/:id",
  param("id").isMongoId().withMessage(Msg.INVALID_ID),
  authenticateAdmin,
  controller.updateSubCategory
);

/**
 * Router to delete subCategory
 */
router.delete(
  "/delete/:id",
  param("id").isMongoId().withMessage(Msg.INVALID_ID),
  authenticateAdmin,
  controller.deleteSubCategory
);

module.exports = router;
