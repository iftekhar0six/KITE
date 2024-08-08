"use strict";

const message = require("../models/message");

/**
 * used for filtering the message collection by filter
 *
 * @param {object} filter
 * @returns the message detail
 */
async function getDetail(filter) {
  const detail = await message.findOne(filter);
  return detail;
}

/**
 * function used to create message
 *
 * @param {object} messageInfo
 * @returns the saved message detail
 */
async function create(messageInfo) {
  const newData = new message(messageInfo);
  const data = await newData.save();
  return data;
}

/**
 * function to delete message
 *
 * @param {string} messageId
 * @returns {object} the deleted message
 */
async function deleteMessage(messageId) {
  const data = await message.findByIdAndDelete(messageId);
  return data;
}
module.exports = {
  getDetail: getDetail,
  create: create,
  deleteMessage: deleteMessage,
};
