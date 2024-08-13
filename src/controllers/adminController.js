"use strict";

const userRepo = require("../dataService/user");
const otpRepo = require("../dataService/otp");
const service = require("../helpers/service");
const { HttpStatus } = require("../utils/httpStatus");
const { Msg } = require("../utils/messageCode");
const mailRepo = require("../helpers/mail");
const imageMimeType = ["image/jpeg", "image/png", "image/jpg"];
const otpGeneration = require("../helpers/otp");

require("dotenv").config();

module.exports = {
  /**
   * function to create admin
   *
   * @param {string} req.body.fName - The Admin's first name.
   * @param {string} req.body.lName - The Admin's last name.
   * @param {string} req.body.email - The Admin's email address.
   * @param {number} req.body.mobile - The Admin's mobile number.
   * @param {string} req.body.gender - The Admin's gender.
   * @param {string} req.body.password - The Admin's password.
   * @param {string} req.files.image - The Admin's avatar.
   * @param {string} req.body.bio - The Admin's bio.
   * @param {string} req.body.location - The Admin's location.
   * @returns {object} the details of create Admin
   */
  signUp: async function (req, res) {
    try {
      if (service.hasValidatorErrors(req, res)) {
        return;
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
      const userImage = await service.imageUpload(
        req.files.image,
        "profile-pic"
      );

      const detail = {
        type: 2,
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

      const newUser = await userRepo.create(detail);

      await mailRepo.adminSignupMail(
        detail.fName,
        detail.lName,
        detail.mobile,
        detail.email,
        req.body.password
      );

      return res.send(
        service.prepareResponse(HttpStatus.SUCCESS, Msg.USER_REGISTERED, {
          id: newUser.id,
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
   * function for logging in admin by email and password
   *
   * @param {string} req.body.email - The Admin's email address.
   * @param {string} req.body.password - The Admin's password.
   * @returns {object} the admin login details
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

      const isAdminExist = await userRepo.getDetail({ email: detail.email });
      if (!isAdminExist) {
        return res.send(
          service.prepareResponse(
            HttpStatus.UNAUTHORIZED,
            Msg.INVALID_CREDENTIALS
          )
        );
      }

      if (isAdminExist.type === 1) {
        return res.send(
          service.prepareResponse(
            HttpStatus.UNAUTHORIZED,
            Msg.ADMIN_LOGIN_PANEL
          )
        );
      }

      const isMatched = await service.comparePassword(
        detail.password,
        isAdminExist.password
      );
      if (!isMatched) {
        return res.send(
          service.prepareResponse(
            HttpStatus.UNAUTHORIZED,
            Msg.INCORRECT_PASSWORD
          )
        );
      }
      const token = service.generateToken(isAdminExist);
      return res.send(
        service.prepareResponse(HttpStatus.SUCCESS, Msg.LOGGED_IN, token)
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
   * function to find admin
   *
   * @param {string} req.user.id - The Admin's Id.
   * @returns {object} the admin details
   */
  adminDetail: async function (req, res) {
    try {
      if (service.hasValidatorErrors(req, res)) {
        return;
      }
      const userId = req.user.id;
      const isAdmin = await userRepo.getDetail({ _id: userId });

      if (!isAdmin) {
        return res.send(
          service.prepareResponse(HttpStatus.NOT_FOUND, Msg.ADMIN_NOT_EXIST)
        );
      }
      return res.send(
        service.prepareResponse(HttpStatus.SUCCESS, Msg.SUCCESS, {
          _id: isAdmin.id,
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
   * function to update an admin
   *
   * @param {string} req.user.id - The Admin's id.
   * @param {string} req.body.type - The Admin's type.
   * @param {string} req.body.fName - The Admin's first name.
   * @param {string} req.body.lName - The Admin's last name.
   * @param {string} req.body.email - The Admin's email address.
   * @param {number} req.body.mobile - The Admin's mobile number.
   * @param {string} req.body.gender - The Admin's gender.
   * @param {string} req.body.password - The Admin's password.
   * @param {string} req.body.image - The Admin's avatar.
   * @param {string} req.body.bio - The Admin's bio.
   * @param {string} req.body.location - The Admin's location.
   * @returns {object} the details of update Admin
   */

  updateProfile: async function (req, res) {
    try {
      if (service.hasValidatorErrors(req, res)) {
        return;
      }

      const userId = req.user.id;
      const isAdmin = await userRepo.getDetail({ _id: userId });
      if (!isAdmin) {
        return res.send(
          service.prepareResponse(HttpStatus.NOT_FOUND, Msg.USER_NOT_EXIST)
        );
      }

      let userImage = isAdmin.image;

      if (req.files?.image) {
        userImage = await service.imageUpload(req.files.image, "profile-pic");

        if (isAdmin.image) {
          await service.deleteFile(isAdmin.image);
        }
        req.body.image = userImage;
      }

      const detail = {
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

      const updateAdmin = await userRepo.update(userId, detail);
      if (!updateAdmin) {
        return res.send(
          service.prepareResponse(HttpStatus.BAD_REQUEST, Msg.USER_NOT_UPDATE)
        );
      }

      await mailRepo.userUpdateMail(
        updateAdmin.fName,
        updateAdmin.lName,
        updateAdmin.mobile,
        updateAdmin.email,
        req.body.password
      );

      return res.send(
        service.prepareResponse(HttpStatus.SUCCESS, Msg.SUCCESS, {
          id: updateAdmin.id,
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
   * function to deactivate admin account
   *
   * @param {string} req.user.id - The Admin's id.
   * @returns {object} the details of deleted admin
   */
  deactivateAccount: async function (req, res) {
    try {
      if (service.hasValidatorErrors(req, res)) {
        return;
      }
      const adminId = req.user.id;
      const isAdmin = await userRepo.getDetail({ _id: adminId });
      if (!isAdmin) {
        return res.send(
          service.prepareResponse(HttpStatus.NOT_FOUND, Msg.USER_NOT_EXIST)
        );
      }

      await mailRepo.userDeleteMail(
        isAdmin.fName,
        isAdmin.lName,
        isAdmin.mobile,
        isAdmin.email
      );

      const deletedAdmin = await userRepo.deleteUser(adminId);
      if (!deletedAdmin) {
        return res.send(
          service.prepareResponse(HttpStatus.BAD_REQUEST, Msg.USER_NOT_DELETED)
        );
      }

      return res.send(
        service.prepareResponse(HttpStatus.SUCCESS, Msg.USER_DELETE, {
          id: deletedAdmin.id,
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
      const isUser = await userRepo.getDetail({ _id: userId });
      const newPassword = req.body.password;
      const hashPassword = await service.bcryptPassword(newPassword);

      if (!isUser) {
        return res.send(
          service.prepareResponse(HttpStatus.NOT_FOUND, Msg.USER_NOT_EXIST)
        );
      }
      await userRepo.update(userId, { password: hashPassword });
      await mailRepo.passwordUpdMail(newPassword, isUser.email);
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
      await mailRepo.otpMailer(otp, isUser.email);

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

      await mailRepo.resetPassword(newPassword, isOtp.email);

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

  /**
   * function to update an user by id
   *
   * @param {string} req.params.id - The User's id.
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
   * @returns {object} the details of update user
   */

  updateUserById: async function (req, res) {
    try {
      if (service.hasValidatorErrors(req, res)) {
        return;
      }

      const userId = req.params.id;
      const isUser = await userRepo.getDetail({ _id: userId });
      if (!isUser) {
        return res.send(
          service.prepareResponse(HttpStatus.NOT_FOUND, Msg.USER_NOT_EXIST)
        );
      }

      let userImage = isUser.image;

      if (req.files?.image) {
        userImage = await service.imageUpload(req.files.image, "profile-pic");

        if (isUser.image) {
          await service.deleteFile(isUser.image);
        }
        req.body.image = userImage;
      }

      const detail = {
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

      const updateUser = await userRepo.update(userId, detail);
      if (!updateUser) {
        return res.send(
          service.prepareResponse(HttpStatus.BAD_REQUEST, Msg.USER_NOT_UPDATE)
        );
      }

      await mailRepo.userUpdByAdmin(
        updateUser.fName,
        updateUser.lName,
        updateUser.mobile,
        updateUser.email,
        req.body.password
      );

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
   * function to deactivate user account by id
   *
   * @param {string} req.params.id - The User's id.
   * @returns {object} the details of deleted user
   */
  deactivateUserById: async function (req, res) {
    try {
      if (service.hasValidatorErrors(req, res)) {
        return;
      }
      const userId = req.params.id;
      const isUser = await userRepo.getDetail({ _id: userId });
      if (!isUser) {
        return res.send(
          service.prepareResponse(HttpStatus.NOT_FOUND, Msg.USER_NOT_EXIST)
        );
      }

      await mailRepo.userAccDeleteByAdmin(
        isUser.fName,
        isUser.lName,
        isUser.mobile,
        isUser.email
      );

      const deletedUser = await userRepo.deleteUser(userId);
      if (!deletedUser) {
        return res.send(
          service.prepareResponse(HttpStatus.BAD_REQUEST, Msg.USER_NOT_DELETED)
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
};
