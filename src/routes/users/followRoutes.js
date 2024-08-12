"use strict";

const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const { Msg } = require("../../utils/messageCode");
const { authenticateUser } = require("../../helpers/middleware");

const controller = require("../../controllers/followController");

/**
 * Router to follow/unfollows
 */
router.post(
  "/follow",
  body("followingId")
    .notEmpty()
    .withMessage(Msg.FOLLOWING_REQUIRED)
    .isMongoId()
    .withMessage(Msg.INVALID_ID),
  authenticateUser,
  controller.follower
);

module.exports = router;
