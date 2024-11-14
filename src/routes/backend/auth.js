"use strict";
const controller = require("../../controllers/backend/authController");
const express = require("express");
const router = express.Router();

router.get("/register", controller.signupForm);
router.post("/register-submit", controller.signup);

router.get("/", controller.loginForm);
router.post("/login-submit", controller.login);

router.get("/logout", controller.logout);


module.exports = router;
