"use strict";

const express = require("express");
const router = express.Router();
const { body, param } = require("express-validator");
const controller = require("../../controllers/messageController");
const { Msg } = require("../../utils/messageCode");
const { authenticateAdmin } = require("../../helpers/middleware");

/**
 * Router to create message
 */
router.post(
  "/send",
  body("content").notEmpty().withMessage(Msg.MESSAGE_CONTENT_REQUIRED),
  body("receiverId").notEmpty().withMessage(Msg.MESSAGE_RECEIVER_REQUIRED),
  authenticateAdmin,
  controller.create
);

/**
 * Router to delete message
 */
router.delete(
  "/remove/:id",
  param("id").isMongoId().withMessage(Msg.INVALID_ID),
  authenticateAdmin,
  controller.deleteMessage
);

module.exports = router;
