"use strict";

const express = require("express");
const router = express.Router();

/**
 * User/Admin Router
 */
const controller = require("../../controllers/backend/admin");

router.get("/profile", controller.userProfile);
router.get("/user", controller.listUser);
router.get("/update/:userid", controller.userRoute);
router.post("/update-user/:userid", controller.updateUser);
router.get("/home", controller.userCount);
router.get("/register", controller.registerAdmin);
router.get("/deleteUser/:userid", controller.deleteUser);

module.exports = router;
