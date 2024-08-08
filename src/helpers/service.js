"use strict";

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const path = require("path");
const fs = require("fs");
const { validationResult } = require("express-validator");
const { HttpStatus } = require("../utils/httpStatus");
const { Msg } = require("../utils/messageCode");

const ErrorCode = {
  REQUIRED_CODE: 400,
};

/**
 * Checks if there are validation errors in the request.
 *
 * @returns Returns true if there are validation errors, false otherwise.
 */
function hasValidatorErrors(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const err = errors.array()[0];
    res
      .status(400)
      .json(prepareResponse(ErrorCode.REQUIRED_CODE, err.msg, null));
    return true;
  } else {
    return false;
  }
}

/**
 * Prepares a structured response object.
 *
 * @param {number} status - The status code of error.
 * @param {string} message - The message describing the error.
 * @param {any} data - Data to include in the error response.
 * @returns Returns a object with status, message, and optional data.
 */
function prepareResponse(status, message, data) {
  if (data != null || data != undefined) {
    return {
      responseCode: status,
      responseMessage: message,
      responseData: data,
    };
  } else {
    return {
      responseCode: status,
      responseMessage: message,
    };
  }
}

/**
 * Function use for hashing password using bcrypt
 *
 * @param {string} password - password
 * @returns {any} hashed password
 */
async function bcryptPassword(password, req, res) {
  try {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
  } catch (error) {
    return res.send(
      service.prepareResponse(HttpStatus.BAD_REQUEST, Msg.PASSWD_NOT_HASHED)
    );
  }
}

/**
 * Function use for comparing password's using bcrypt
 *
 * @param {string} password - The User's input password
 * @param {string} hashPassword - The User's password present in database
 * @returns {any} comparison of password
 */
async function comparePassword(password, hashPassword, req, res) {
  try {
    return await bcrypt.compare(password, hashPassword);
  } catch (error) {
    return res.send(
      service.prepareResponse(HttpStatus.BAD_REQUEST, Msg.PASSWD_NOT_HASHED)
    );
  }
}

/**
 * function for creating JWT token
 *
 * @param {string}  user The user for JWT token generation
 * @returns {string} The generated token
 */
function generateToken(user) {
  try {
    const payload = {
      id: user._id,
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
      expiresIn: "6d",
    });
    return token;
  } catch (error) {
    console.error(error);
  }
}

/**
 * function for image upload
 *
 * @param {Object} image The image file which is going to upload
 * @param {string} folderName Name of folder in which images will be saved
 * @returns path of the uploaded image
 */
const imageUpload = async (image, folderName) => {
  try {
    // Upload path
    const uploadPath = path.join(__dirname, "../images/", folderName);
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }

    const filePath = path.join(uploadPath, image.name);
    await image.mv(filePath);
    return filePath;
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  hasValidatorErrors: hasValidatorErrors,
  prepareResponse: prepareResponse,
  bcryptPassword: bcryptPassword,
  comparePassword: comparePassword,
  generateToken: generateToken,
  imageUpload: imageUpload,
};
