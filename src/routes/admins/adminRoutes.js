const express = require("express");
const router = express.Router();
const { body, param } = require("express-validator");
const { Msg } = require("../../utils/messageCode");
const controller = require("../../controllers/adminController");
const { authenticateAdmin } = require("../../helpers/middleware");

/**
 * Router to create Admin
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
  controller.signUp
);

/**
 * Router to login Admin
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
  controller.login
);

/**
 * Router to find Admin
 */
router.get("/detail", authenticateAdmin, controller.adminDetail);

/**
 * Router to list Admin
 */
router.get("/list", authenticateAdmin, controller.listUser);

/**
 * Router to update Admin
 */
router.put(
  "/update",
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
  authenticateAdmin,
  controller.updateProfile
);
/**
 * Router to delete Admin
 */
router.delete("/delete", authenticateAdmin, controller.deactivateAccount);

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
  authenticateAdmin,
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
 * Router to reset password
 */
router.put(
  "/reset-password",
  body("password")
    .notEmpty()
    .withMessage(Msg.PASSWORD_REQUIRED)
    .isLength({ min: 6 })
    .withMessage(Msg.PASSWORD_LENGTH),
  body("otp").notEmpty().withMessage(Msg.OTP_REQUIRED),
  controller.resetPassword
);

/**
 * Router to update User by Id from Admin
 */
router.put(
  "/update-by-id/:id",
  param("id")
    .notEmpty()
    .withMessage(Msg.ID_REQUIRED)
    .isMongoId()
    .withMessage(Msg.INVALID_ID),
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
  authenticateAdmin,
  controller.updateUserById
);

/**
 * Router to delete User by Id from Admin
 */
router.delete(
  "/delete-by-id/:id",
  param("id")
    .notEmpty()
    .withMessage(Msg.ID_REQUIRED)
    .isMongoId()
    .withMessage(Msg.INVALID_ID),
  authenticateAdmin,
  controller.deactivateUserById
);

module.exports = router;
