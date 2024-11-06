"use strict";

const express = require("express");
const router = express.Router();
const { body, param } = require("express-validator");
const { Msg } = require("../../utils/messageCode");
const { authenticateAdmin } = require("../../helpers/middleware");

const controller = require("../../controllers/categoryController");

/**
 * Router to create category
 */
router.post(
  "/create",
  body("name").notEmpty().withMessage(Msg.CATEGORY_NAME_REQUIRED),
  body("description").notEmpty().withMessage(Msg.CATEGORY_DESCRIPTION_REQUIRED),
  authenticateAdmin,
  controller.create
);

/**
 * Router to find category
 */
router.get(
  "/detail/:id",
  param("id").isMongoId().withMessage(Msg.INVALID_ID),
  authenticateAdmin,
  controller.findCategory
);

/**
 * Router to list category
 */
router.get("/list", authenticateAdmin, controller.listCategory);

/**
 * Router to update category
 */
router.put(
  "/update/:id",
  param("id").isMongoId().withMessage(Msg.INVALID_ID),
  body("name").optional().notEmpty().withMessage(Msg.CATEGORY_NAME_REQUIRED),
  body("description")
    .optional()
    .notEmpty()
    .withMessage(Msg.CATEGORY_DESCRIPTION_REQUIRED),
  authenticateAdmin,
  controller.updateCategory
);

/**
 * Router to delete category
 */
router.delete(
  "/delete/:id",
  param("id").isMongoId().withMessage(Msg.INVALID_ID),
  authenticateAdmin,
  controller.deleteCategory
);

module.exports = router;
