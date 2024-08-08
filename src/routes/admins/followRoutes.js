"use strict";

const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const { Msg } = require("../../utils/messageCode");
const { authenticateAdmin } = require("../../helpers/middleware");

const controller = require("../../controllers/followController");

router.post(
  "/follow",
  body("followingId")
    .notEmpty()
    .withMessage(Msg.FOLLOWING_REQUIRED)
    .isMongoId()
    .withMessage(Msg.INVALID_ID),
  authenticateAdmin,
  controller.follower
);

router.get("/list", authenticateAdmin, controller.list);

module.exports = router;
