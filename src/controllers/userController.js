"use strict";

const userRepo = require("../dataService/user");
const otpRepo = require("../dataService/otp");
const service = require("../helpers/service");
const { HttpStatus } = require("../utils/httpStatus");
const { Msg } = require("../utils/messageCode");
const mailer = require("../helpers/mail");
const imageMimeType = ["image/jpeg", "image/png", "image/jpg"];
const otpGeneration = require("../helpers/otp");

require("dotenv").config();

module.exports = {
  /**
   * function to create user
   *
   * @param {string} req.body.type - The User's type.
   * @param {string} req.body.fName - The User's first name.
   * @param {string} req.body.lName - The User's last name.
   * @param {string} req.body.email - The User's email address.
   * @param {number} req.body.mobile - The User's mobile number.
   * @param {string} req.body.gender - The User's gender.
   * @param {string} req.body.password - The User's password.
   * @param {string} req.files.image - The User's avatar.
   * @param {string} req.body.bio - The User's bio.
   * @param {string} req.body.location - The User's location.
   * @returns {object} the details of create user
   */
  signUp: async function (req, res) {
    try {
      if (service.hasValidatorErrors(req, res)) {
        return;
      }
      const userImage = await service.imageUpload(
        req.files.image,
        "profile-pic"
      );

      const detail = {
        type: req.body.type,
        fName: req.body.fName,
        lName: req.body.lName,
        email: req.body.email,
        mobile: req.body.mobile,
        gender: req.body.gender,
        password: await service.bcryptPassword(req.body.password),
        image: userImage,
        bio: req.body.bio,
        location: req.body.location,
      };

      const isEmailExist = await userRepo.getDetail({ email: detail.email });
      if (isEmailExist) {
        return res.send(
          service.prepareResponse(
            HttpStatus.ALREADY_EXIST,
            Msg.USER_EMAIL_EXIST
          )
        );
      }
      const isMobileExist = await userRepo.getDetail({ mobile: detail.mobile });
      if (isMobileExist) {
        return res.send(
          service.prepareResponse(
            HttpStatus.ALREADY_EXIST,
            Msg.USER_MOBILE_EXIST
          )
        );
      }

      if (!req.files || !req.files?.image) {
        return res.send(
          service.prepareResponse(HttpStatus.REQUIRED, Msg.IMAGE_REQUIRED)
        );
      }
      if (!imageMimeType.includes(req.files.image.mimetype)) {
        return res.send(
          service.prepareResponse(HttpStatus.BAD_REQUEST, Msg.INVALID_IMAGE)
        );
      }

      const newUser = await userRepo.create(detail);

      const mailData = {
        from: process.env.MAIL_ID,
        to: detail.email,
        subject: "Registration to KITE forum",
        text: `Dear ${detail.fName},
        You have been registered to KITE
        Name: ${detail.fName} ${detail.lName}
        Mobile No.: ${detail.mobile}
        email: ${detail.email}
        password: ${req.body.password}
        `,
      };

      const mailUpdate = await mailer(mailData);
      if (!mailUpdate) {
        return res.send(
          service.prepareResponse(HttpStatus.BAD_REQUEST, Msg.MAIL_ERROR)
        );
      }

      return res.send(
        service.prepareResponse(HttpStatus.SUCCESS, Msg.USER_REGISTERED, {
          id: newUser.id,
        })
      );
    } catch (error) {
      console.error(error);
      return res.send(
        service.prepareResponse(
          HttpStatus.INTERNAL_SERVER_ERROR,
          Msg.INTERNAL_SERVER_ERROR
        )
      );
    }
  },

  /**
   * function logging in user by email and password
   *
   * @param {string} req.body.email - The User's email address.
   * @param {string} req.body.password - The User's password.
   * @returns {object} the user login details
   */
  login: async function (req, res) {
    try {
      if (service.hasValidatorErrors(req, res)) {
        return;
      }
      const detail = {
        email: req.body.email,
        password: req.body.password,
      };

      const isUserExist = await userRepo.getDetail({ email: detail.email });
      if (!isUserExist) {
        return res.send(
          service.prepareResponse(HttpStatus.NOT_FOUND, Msg.USER_NOT_FOUND)
        );
      }
      const isMatched = await service.comparePassword(
        detail.password,
        isUserExist.password
      );
      if (isUserExist && isMatched) {
        const token = service.generateToken(isUserExist);
        return res.send(
          service.prepareResponse(HttpStatus.SUCCESS, Msg.LOGGED_IN, token)
        );
      }
      return res.send(
        service.prepareResponse(
          HttpStatus.UNAUTHORIZED,
          Msg.INVALID_CREDENTIALS
        )
      );
    } catch (error) {
      return res.send(
        service.prepareResponse(
          HttpStatus.INTERNAL_SERVER_ERROR,
          Msg.INTERNAL_SERVER_ERROR
        )
      );
    }
  },

  /**
   * function to find user by Id
   *
   * @param {string} req.user.id - The User's Id.
   * @returns {object} the user details
   */
  userDetail: async function (req, res) {
    try {
      if (service.hasValidatorErrors(req, res)) {
        return;
      }
      const userId = req.user.id;
      const isUser = await userRepo.getDetail({ _id: userId });

      if (!isUser) {
        return res.send(
          service.prepareResponse(HttpStatus.NOT_FOUND, Msg.USER_NOT_EXIST)
        );
      }
      return res.send(
        service.prepareResponse(HttpStatus.SUCCESS, Msg.SUCCESS, {
          _id: isUser.id,
        })
      );
    } catch (error) {
      return res.send(
        service.prepareResponse(
          HttpStatus.INTERNAL_SERVER_ERROR,
          Msg.INTERNAL_SERVER_ERROR
        )
      );
    }
  },

  /**
   * function to get users list, search functionality added
   *
   * @param {number} req.query.page - Page number.
   * @param {string} req.query.perPage - Users per page.
   * @param {string} req.query.searchTerm - The search term.
   * @returns {object} the users list
   */
  listUser: async function (req, res) {
    try {
      const page = req.query.page || 1;
      const limit = Number(req.query.perPage) || 20;
      const searchTerm = req.query.searchTerm;

      const { listUser, totalUsers, totalPages } = await userRepo.list(
        searchTerm,
        page,
        limit
      );

      const response = {
        totalUsers: totalUsers,
        totalPages: totalPages,
        searchTerm: searchTerm,
        perPage: limit,
        listUser: listUser,
      };

      return res.send(
        service.prepareResponse(HttpStatus.SUCCESS, Msg.SUCCESS, response)
      );
    } catch (error) {
      return res.send(
        service.prepareResponse(
          HttpStatus.INTERNAL_SERVER_ERROR,
          Msg.INTERNAL_SERVER_ERROR
        )
      );
    }
  },

  /**
   * function to update an user
   *
   * @param {string} req.user.id - The User's id.
   * @param {string} req.body.type - The User's type.
   * @param {string} req.body.fName - The User's first name.
   * @param {string} req.body.lName - The User's last name.
   * @param {string} req.body.email - The User's email address.
   * @param {number} req.body.mobile - The User's mobile number.
   * @param {string} req.body.gender - The User's gender.
   * @param {string} req.body.password - The User's password.
   * @param {string} req.body.image - The User's avatar.
   * @param {string} req.body.bio - The User's bio.
   * @param {string} req.body.location - The User's location.
   * @returns {object} the details of create user
   */
  updateProfile: async function (req, res) {
    try {
      if (service.hasValidatorErrors(req, res)) {
        return;
      }
      const userId = req.user.id;

      const userImage = await service.imageUpload(
        req.files.image,
        "profile-pic"
      );

      const hashPassword = await service.bcryptPassword(req.body.password);

      const detail = {
        type: req.body.type,
        fName: req.body.fName,
        lName: req.body.lName,
        email: req.body.email,
        mobile: req.body.mobile,
        gender: req.body.gender,
        password: hashPassword,
        image: userImage,
        bio: req.body.bio,
        location: req.body.location,
      };

      const isUser = await userRepo.getDetail({ _id: userId });
      if (!isUser) {
        return res.send(
          service.prepareResponse(HttpStatus.NOT_FOUND, Msg.USER_NOT_EXIST)
        );
      }

      if (!imageMimeType.includes(req.files.image.mimetype)) {
        return res.send(
          service.prepareResponse(HttpStatus.BAD_REQUEST, Msg.INVALID_IMAGE)
        );
      }

      const updateUser = await userRepo.update(userId, detail);
      if (!updateUser) {
        return res.send(
          service.prepareResponse(HttpStatus.BAD_REQUEST, Msg.USER_NOT_UPDATE)
        );
      }

      const mailData = {
        from: process.env.MAIL_ID,
        to: detail.email,
        subject: "KITE profile update",
        text: `Dear ${detail.fName},
        Your profile has been updated
        Name: ${detail.fName} ${detail.lName}
        Mobile No.: ${detail.mobile}
        email: ${detail.email}
        password: ${req.body.password}
        `,
      };

      const mailUpdate = await mailer(mailData);
      if (!mailUpdate) {
        return res.send(
          service.prepareResponse(HttpStatus.BAD_REQUEST, Msg.MAIL_ERROR)
        );
      }

      return res.send(
        service.prepareResponse(HttpStatus.SUCCESS, Msg.SUCCESS, {
          id: updateUser.id,
        })
      );
    } catch (error) {
      return res.send(
        service.prepareResponse(
          HttpStatus.INTERNAL_SERVER_ERROR,
          Msg.INTERNAL_SERVER_ERROR
        )
      );
    }
  },

  /**
   * function to delete an user
   *
   * @param {string} req.user.id - The User's id.
   * @returns {object} the details of deleted user
   */
  deactivateAccount: async function (req, res) {
    try {
      if (service.hasValidatorErrors(req, res)) {
        return;
      }
      const userId = req.user.id;
      const isUser = await userRepo.getDetail({ _id: userId });
      if (!isUser) {
        return res.send(
          service.prepareResponse(HttpStatus.NOT_FOUND, Msg.USER_NOT_EXIST)
        );
      }

      const deletedUser = await userRepo.deleteUser(userId);
      if (!deletedUser) {
        return res.send(
          service.prepareResponse(HttpStatus.BAD_REQUEST, Msg.USER_NOT_DELETED)
        );
      }

      const mailData = {
        from: process.env.MAIL_ID,
        to: isUser.email,
        subject: "KITE profile deactivation",
        text: `Dear ${isUser.fName},
        Your KITE profile has been deactivated
        Name: ${isUser.fName} ${isUser.lName}
        Mobile No.: ${isUser.mobile}
        email: ${isUser.email}
        `,
      };

      const mailUpdate = await mailer(mailData);
      if (!mailUpdate) {
        return res.send(
          service.prepareResponse(HttpStatus.BAD_REQUEST, Msg.MAIL_ERROR)
        );
      }

      return res.send(
        service.prepareResponse(HttpStatus.SUCCESS, Msg.USER_DELETE, {
          id: deletedUser.id,
        })
      );
    } catch (error) {
      return res.send(
        service.prepareResponse(
          HttpStatus.INTERNAL_SERVER_ERROR,
          Msg.INTERNAL_SERVER_ERROR
        )
      );
    }
  },

  /**
   * function to update password
   *
   * @param {string} req.user.id - The User's Id.
   * @param {string} req.body.password - The Password.
   * @returns {object} the details of updated password
   */
  updatePassword: async function (req, res) {
    try {
      const userId = req.user.id;
      const user = await userRepo.getDetail({ _id: userId });
      const newPassword = req.body.password;
      const hashPassword = await service.bcryptPassword(newPassword);

      const mailData = {
        from: process.env.MAIL_ID,
        to: user.email,
        subject: "KITE password update",
        text: `Your password for KITE has been updated to : ${newPassword}`,
      };

      const mailUpdate = await mailer(mailData);
      if (!mailUpdate) {
        return res.send(
          service.prepareResponse(HttpStatus.BAD_REQUEST, Msg.MAIL_ERROR)
        );
      }
      if (!user) {
        return res.send(
          service.prepareResponse(HttpStatus.NOT_FOUND, Msg.USER_NOT_EXIST)
        );
      }
      await userRepo.update(userId, { password: hashPassword });
      return res.send(
        service.prepareResponse(HttpStatus.SUCCESS, Msg.PASSWORD_UPDATED)
      );
    } catch (error) {
      return res.send(
        service.prepareResponse(
          HttpStatus.INTERNAL_SERVER_ERROR,
          Msg.INTERNAL_SERVER_ERROR
        )
      );
    }
  },

  /**
   * function for forget password send OTP to existing user's email
   *
   * @param {string} req.body.email - The User's email.
   * @returns {object} send OTP
   */
  forgetPassword: async function (req, res) {
    try {
      const email = req.body.email;

      const isUser = await userRepo.getDetail({ email: email });
      if (!isUser) {
        return res.send(
          service.prepareResponse(HttpStatus.NOT_FOUND, Msg.NO_USER_EMAIL)
        );
      }

      const otp = await otpGeneration(isUser.email);

      const mailData = {
        from: process.env.MAIL_ID,
        to: isUser.email,
        subject: "KITE password reset",
        text: `Reset your password using this otp: ${otp}`,
      };

      const mailUpdate = await mailer(mailData);
      if (!mailUpdate) {
        return res.send(
          service.prepareResponse(HttpStatus.BAD_REQUEST, Msg.MAIL_ERROR)
        );
      }

      return res.send(
        service.prepareResponse(HttpStatus.SUCCESS, Msg.OTP_SENT)
      );
    } catch (error) {
      return res.send(
        service.prepareResponse(
          HttpStatus.INTERNAL_SERVER_ERROR,
          Msg.INTERNAL_SERVER_ERROR
        )
      );
    }
  },

  /**
   * function to reset password with OTP without login
   *
   * @param {string} req.body.otp - The otp.
   * @param {string} req.body.password - The Password.
   * @returns {object} the details of reset password
   */
  resetPassword: async function (req, res) {
    try {
      const otp = req.body.otp;
      const newPassword = req.body.password;
      const hashPassword = await service.bcryptPassword(newPassword);

      const isOtp = await otpRepo.getDetail({ otp: otp });
      if (!isOtp) {
        return res.send(
          service.prepareResponse(HttpStatus.BAD_REQUEST, Msg.INVALID_OTP)
        );
      }

      const user = await userRepo.getDetail({ email: isOtp.email });
      await userRepo.update(user.id, { password: hashPassword });

      const mailData = {
        from: process.env.MAIL_ID,
        to: user.email,
        subject: "Password updated on KITE",
        text: `Your new updated password for KITE profile is: ${newPassword}`,
      };

      const mailUpdate = await mailer(mailData);
      if (!mailUpdate) {
        return res.send(
          service.prepareResponse(HttpStatus.BAD_REQUEST, Msg.MAIL_ERROR)
        );
      }

      await otpRepo.deleteOtp(isOtp._id);
      return res.send(
        service.prepareResponse(HttpStatus.SUCCESS, Msg.PASSWORD_UPDATED)
      );
    } catch (error) {
      return res.send(
        service.prepareResponse(
          HttpStatus.INTERNAL_SERVER_ERROR,
          Msg.INTERNAL_SERVER_ERROR
        )
      );
    }
  },
};
