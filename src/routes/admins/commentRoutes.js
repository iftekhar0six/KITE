"use strict";

const express = require("express");
const router = express.Router();
const { body, param } = require("express-validator");
const { Msg } = require("../../utils/messageCode");
const { authenticateAdmin } = require("../../helpers/middleware");

const controller = require("../../controllers/commentController");

/**
 * Router to create comment
 */
router.post(
  "/create",
  body("content").notEmpty().withMessage(Msg.COMMENT_CONTENT_REQUIRED),
  body("categoryId").notEmpty().withMessage(Msg.CATEGORY_ID_REQUIRED),
  body("subCategoryId").notEmpty().withMessage(Msg.SUBCATEGORY_ID_REQUIRED),
  body("postId").notEmpty().withMessage(Msg.POST_ID_REQUIRED),
  authenticateAdmin,
  controller.create
);

/**
 * Router to find comment
 */
router.get(
  "/detail/:id",
  param("id").isMongoId().withMessage(Msg.INVALID_ID),
  authenticateAdmin,
  controller.findComment
);

/**
 * Router to list comment
 */
router.get("/list", authenticateAdmin, controller.listComment);

/**
 * Router to update comment
 */
router.put(
  "/update/:id",
  param("id").isMongoId().withMessage(Msg.INVALID_ID),
  authenticateAdmin,
  controller.updateComment
);

/**
 * Router to delete comment
 */
router.delete(
  "/delete/:id",
  param("id").isMongoId().withMessage(Msg.INVALID_ID),
  authenticateAdmin,
  controller.deleteComment
);

module.exports = router;
