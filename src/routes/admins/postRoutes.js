"use strict";

const express = require("express");
const router = express.Router();
const { body, param } = require("express-validator");
const { Msg } = require("../../utils/messageCode");
const { authenticateAdmin } = require("../../helpers/middleware");

const controller = require("../../controllers/postController");

/**
 * Router to create post
 */
router.post(
  "/create",
  body("content").notEmpty().withMessage(Msg.POST_CONTENT_REQUIRED),
  body("categoryId").notEmpty().withMessage(Msg.CATEGORY_ID_REQUIRED),
  body("subCategoryId").notEmpty().withMessage(Msg.SUBCATEGORY_ID_REQUIRED),
  authenticateAdmin,
  controller.create
);

/**
 * Router to find post
 */
router.get(
  "/detail/:id",
  param("id").isMongoId().withMessage(Msg.INVALID_ID),
  authenticateAdmin,
  controller.findPost
);

/**
 * Router to list post
 */
router.get("/list", authenticateAdmin, controller.listPost);

/**
 * Router to update post
 */
router.put(
  "/update/:id",
  param("id").isMongoId().withMessage(Msg.INVALID_ID),
  authenticateAdmin,
  controller.updatePost
);

/**
 * Router to delete post
 */
router.delete(
  "/delete/:id",
  param("id").isMongoId().withMessage(Msg.INVALID_ID),
  authenticateAdmin,
  controller.deletePost
);

module.exports = router;
