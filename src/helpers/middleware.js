"use strict";

const jwt = require("jsonwebtoken");
require("dotenv").config();
const { Msg } = require("../utils/messageCode");
const { HttpStatus } = require("../utils/httpStatus");
const service = require("../helpers/service");
const userRepo = require("../dataService/user");
const users = require("../models/user");

/**
 * function for token access
 *
 * @returns {any} The accessed token
 */
function accessToken(req, res) {
  const token = req.headers["authorization"];
  if (token) {
    const parts = token.split(" ");
    if (parts.length === 2 && parts[0] === "Bearer") {
      return parts[1];
    }
  }
  return null;
}

/**
 * function for verifying JWT token for User
 *
 * @returns {any} The verified token
 */
async function authenticateUser(req, res, next) {
  try {
    const token = accessToken(req);

    if (!token) {
      return res.send(
        service.prepareResponse(HttpStatus.REQUIRED, Msg.TOKEN_REQUIRED)
      );
    }

    const decode = jwt.decode(token);
    const user = await userRepo.getDetail({ _id: decode.id });
    if (user.type === 2) {
      return res.send(
        service.prepareResponse(
          HttpStatus.UNAUTHORIZED,
          Msg.UNAUTHORIZED_ACCESS
        )
      );
    }
    if (!user) {
      return res.send(
        service.prepareResponse(HttpStatus.NOT_FOUND, Msg.TOKEN_USER_NOT_FOUND)
      );
    }
    if (decode.exp * 1000 < Date.now()) {
      return res.send(
        service.prepareResponse(HttpStatus.UNAUTHORIZED, Msg.TOKEN_EXPIRED)
      );
    }

    const verify = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = verify;
    return next();
  } catch (error) {
    console.error(error);
    return res.send(
      service.prepareResponse(HttpStatus.UNAUTHORIZED, Msg.INVALID_TOKEN)
    );
  }
}

/**
 * function for verifying JWT token for Admin
 *
 * @returns {any} The verified token
 */
async function authenticateAdmin(req, res, next) {
  try {
    const token = accessToken(req);

    if (!token) {
      return res.send(
        service.prepareResponse(HttpStatus.REQUIRED, Msg.TOKEN_REQUIRED)
      );
    }

    const decode = jwt.decode(token);
    const user = await userRepo.getDetail({ _id: decode.id });
    if (user.type === 1) {
      return res.send(
        service.prepareResponse(
          HttpStatus.UNAUTHORIZED,
          Msg.UNAUTHORIZED_ACCESS
        )
      );
    }
    if (!user) {
      return res.send(
        service.prepareResponse(HttpStatus.NOT_FOUND, Msg.TOKEN_USER_NOT_FOUND)
      );
    }
    if (decode.exp * 1000 < Date.now()) {
      return res.send(
        service.prepareResponse(HttpStatus.UNAUTHORIZED, Msg.TOKEN_EXPIRED)
      );
    }

    const verify = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = verify;
    return next();
  } catch (error) {
    return res.send(
      service.prepareResponse(HttpStatus.UNAUTHORIZED, Msg.INVALID_TOKEN)
    );
  }
}

module.exports = { authenticateUser, authenticateAdmin };
