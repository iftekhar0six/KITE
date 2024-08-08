const express = require("express");
const router = express.Router();
const { body, param } = require("express-validator");
const { Msg } = require("../../utils/messageCode");
const controller = require("../../controllers/userController");
const { authenticateUser } = require("../../helpers/middleware");

router.post(
  "/signup",
  body("fName").notEmpty().withMessage(Msg.FNAME_REQUIRED),
  body("lName").notEmpty().withMessage(Msg.LNAME_REQUIRED),
  body("email")
    .notEmpty()
    .withMessage(Msg.EMAIL_REQUIRED)
    .isEmail()
    .withMessage(Msg.EMAIL_INVALID),
  body("mobile")
    .notEmpty()
    .withMessage(Msg.USER_MOBILE_EXIST)
    .isLength({ min: 10, max: 12 })
    .withMessage(Msg.MOBILE_INVALID),
  body("gender").notEmpty().withMessage(Msg.GENDER_REQUIRED),
  body("password")
    .notEmpty()
    .withMessage(Msg.PASSWORD_REQUIRED)
    .isLength({ min: 6 })
    .withMessage(Msg.PASSWORD_LENGTH),
  body("bio").notEmpty().withMessage(Msg.BIO_REQUIRED),
  body("location").notEmpty().withMessage(Msg.LOCATION_REQUIRED),
  controller.signUp
);

router.post(
  "/login",
  body("email")
    .notEmpty()
    .withMessage(Msg.EMAIL_REQUIRED)
    .isEmail()
    .withMessage(Msg.EMAIL_INVALID),
  body("password")
    .notEmpty()
    .withMessage(Msg.PASSWORD_REQUIRED)
    .isLength({ min: 6 })
    .withMessage(Msg.PASSWORD_LENGTH),
  controller.login
);

router.get("/find", authenticateUser, controller.userDetail);

router.put(
  "/update",
  body("mobile").isLength({ min: 10, max: 12 }).withMessage(Msg.MOBILE_INVALID),
  body("email").isEmail().withMessage(Msg.EMAIL_INVALID),
  authenticateUser,
  controller.updateProfile
);

router.delete("/delete", authenticateUser, controller.deactivateAccount);

router.put("/update-password", authenticateUser, controller.updatePassword);

router.post(
  "/forget-password",
  body("email")
    .notEmpty()
    .withMessage(Msg.EMAIL_REQUIRED)
    .isEmail()
    .withMessage(Msg.EMAIL_INVALID),
  controller.forgetPassword
);

router.put(
  "/reset-password",
  body("password")
    .notEmpty()
    .withMessage(Msg.PASSWORD_REQUIRED)
    .isLength({ min: 6 })
    .withMessage(Msg.PASSWORD_LENGTH),
  controller.resetPassword
);

module.exports = router;
