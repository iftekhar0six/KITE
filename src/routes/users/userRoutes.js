const express = require("express");
const router = express.Router();
const { body, param } = require("express-validator");
const { Msg } = require("../../utils/messageCode");
const controller = require("../../controllers/userController");
const { authenticateUser } = require("../../helpers/middleware");

/**
 * Router to create user
 */
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
  controller.userSignUp
);

/**
 * Router to login comment
 */
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
  controller.userLogin
);

/**
 * Router to login user
 */
router.get("/detail", authenticateUser, controller.userDetail);

/**
 * Router to update user
 */
router.put(
  "/update-profile",
  body("fName").optional().notEmpty().withMessage(Msg.FNAME_REQUIRED),
  body("lName").optional().notEmpty().withMessage(Msg.LNAME_REQUIRED),
  body("email")
    .optional()
    .notEmpty()
    .withMessage(Msg.EMAIL_REQUIRED)
    .isEmail()
    .withMessage(Msg.EMAIL_INVALID),
  body("mobile")
    .optional()
    .notEmpty()
    .withMessage(Msg.USER_MOBILE_EXIST)
    .isLength({ min: 10, max: 12 })
    .withMessage(Msg.MOBILE_INVALID),
  body("gender").optional().notEmpty().withMessage(Msg.GENDER_REQUIRED),
  body("password")
    .optional()
    .notEmpty()
    .withMessage(Msg.PASSWORD_REQUIRED)
    .isLength({ min: 6 })
    .withMessage(Msg.PASSWORD_LENGTH),
  body("bio").optional().notEmpty().withMessage(Msg.BIO_REQUIRED),
  body("location").optional().notEmpty().withMessage(Msg.LOCATION_REQUIRED),
  authenticateUser,
  controller.updateProfile
);

/**
 * Router to delete user
 */
router.delete(
  "/deactivate-profile",
  authenticateUser,
  controller.deactivateAccount
);

/**
 * Router to update password
 */
router.put(
  "/update-password",
  body("password")
    .notEmpty()
    .withMessage(Msg.PASSWORD_REQUIRED)
    .isLength({ min: 6 })
    .withMessage(Msg.PASSWORD_LENGTH),
  authenticateUser,
  controller.updatePassword
);

/**
 * Router for forget password
 */
router.post(
  "/forget-password",
  body("email")
    .notEmpty()
    .withMessage(Msg.EMAIL_REQUIRED)
    .isEmail()
    .withMessage(Msg.EMAIL_INVALID),
  controller.forgetPassword
);

/**
 * Router to reset password of user
 */
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
