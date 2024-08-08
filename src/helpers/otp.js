"use strict";

const otpGenerator = require("otp-generator");
const otp = require("../models/otp");
/**
 * function for otp generation
 *
 * @returns generated otp
 */
const otpGeneration = async (email) => {
  try {
    const generateOtp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      specialChars: false,
    });

    const otpInfo = { email: email, otp: generateOtp };

    const newData = new otp(otpInfo);
    const data = await newData.save();

    return generateOtp;
  } catch (error) {
    console.error(error);
  }
};

module.exports = otpGeneration;
