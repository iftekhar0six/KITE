"use strict";

const otp = require("../models/otp");

/**
 * used for filtering the otp collection by filter
 *
 * @param {object} filter
 * @returns the otp detail
 */
async function getDetail(filter) {
  const detail = await otp.findOne(filter);
  return detail;
}

/**
 * function to delete otp
 *
 * @param {string} otpId otp id
 * @returns {object} the deleted otp
 */
async function deleteOtp(otpId) {
  const data = await otp.findByIdAndDelete(otpId);
  return data;
}

module.exports = { getDetail: getDetail, deleteOtp: deleteOtp };
