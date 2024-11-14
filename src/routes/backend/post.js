"use strict";

const express = require("express");
const router = express.Router();

const postController = require("../../controllers/backend/post");

router.get("/post", postController.listPost);

module.exports = router;
