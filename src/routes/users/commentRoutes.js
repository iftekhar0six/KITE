"use strict";

const express = require("express");
const router = express.Router();
const { body, param } = require("express-validator");
const { Msg } = require("../../utils/messageCode");
const { authenticateUser } = require("../../helpers/middleware");

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
  authenticateUser,
  controller.create
);

/**
 * Router to find comment
 */
router.get(
  "/detail/:id",
  param("id").isMongoId().withMessage(Msg.INVALID_ID),
  authenticateUser,
  controller.findComment
);

/**
 * Router to update comment
 */
router.put(
  "/update/:id",
  param("id").isMongoId().withMessage(Msg.INVALID_ID),
  authenticateUser,
  controller.updateComment
);

/**
 * Router to delete comment
 */
router.delete(
  "/delete/:id",
  param("id").isMongoId().withMessage(Msg.INVALID_ID),
  authenticateUser,
  controller.deleteComment
);

module.exports = router;
