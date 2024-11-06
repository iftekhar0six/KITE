"use strict";

const express = require("express");
const router = express.Router();

/**
 * User/Admin Router
 */
const adminController = require("../../controllers/backend/admin");

router.get("/user", adminController.listUser);
router.get("/update/:userid", adminController.userRoute);
router.post("/update-user/:userid", adminController.updateUser);
router.get("/home", adminController.userCount);
router.get("/register", adminController.registerAdmin);

router.get("/deleteUser/:userid", adminController.deleteUser);

/**
 * Category Router
 */
const categoryController = require("../../controllers/backend/category");

router.get("/category", categoryController.listCategory);

module.exports = router;
