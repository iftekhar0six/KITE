"use strict";

const express = require("express");
const router = express.Router();
const { body, param } = require("express-validator");
const { Msg } = require("../../utils/messageCode");
const { authenticateUser } = require("../../helpers/middleware");

const controller = require("../../controllers/postController");

router.post(
  "/create",
  body("content").notEmpty().withMessage(Msg.POST_CONTENT_REQUIRED),
  body("userId").notEmpty().withMessage(Msg.POST_CREATOR_REQUIRED),
  body("categoryId").notEmpty().withMessage(Msg.CATEGORY_ID_REQUIRED),
  body("subCategoryId").notEmpty().withMessage(Msg.SUBCATEGORY_ID_REQUIRED),
  authenticateUser,
  controller.create
);

router.get(
  "/find/:id",
  param("id").isMongoId().withMessage(Msg.INVALID_ID),
  authenticateUser,
  controller.findPost
);

router.put(
  "/update/:id",
  param("id").isMongoId().withMessage(Msg.INVALID_ID),
  authenticateUser,
  controller.updatePost
);

router.delete(
  "/delete/:id",
  param("id").isMongoId().withMessage(Msg.INVALID_ID),
  authenticateUser,
  controller.deletePost
);

module.exports = router;
