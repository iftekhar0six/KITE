"use strict";

const express = require("express");
const router = express.Router();
const { body, param } = require("express-validator");
const controller = require("../../controllers/messageController");
const { Msg } = require("../../utils/messageCode");
const { authenticateUser } = require("../../helpers/middleware");

router.post(
  "/create",
  body("content").notEmpty().withMessage(Msg.MESSAGE_CONTENT_REQUIRED),
  body("senderId").notEmpty().withMessage(Msg.MESSAGE_SENDER_REQUIRED),
  body("receiverId").notEmpty().withMessage(Msg.MESSAGE_RECEIVER_REQUIRED),
  authenticateUser,
  controller.create
);

router.delete(
  "/delete/:id",
  param("id").isMongoId().withMessage(Msg.INVALID_ID),
  authenticateUser,
  controller.deleteMessage
);

module.exports = router;
