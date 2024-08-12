"use strict";

const user = require("../models/user");

/**
 * used for filtering the user collection by filter
 *
 * @param {object} filter
 * @returns the user detail
 */
async function getDetail(filter) {
  const detail = await user.findOne(filter);
  return detail;
}

/**
 * used for creating a new user
 *
 * @param {object} userInfo the user info
 * @returns the saved user detail
 */
async function create(userInfo) {
  const newData = new user(userInfo);
  const data = await newData.save();
  return data;
}

/**
 * function to get list of all user and search them by userName and email
 *
 * @param {string} searchTerm - Search term to filter user
 * @param {number} page - Page number
 * @returns {object} list of user
 */
async function list(searchTerm, page, limit) {
  const skip = (page - 1) * limit;
  let query = {};

  if (searchTerm) {
    query = {
      $or: [{ email: { $regex: searchTerm, $options: "i" } }],
    };
  }
  const listUser = await user.find(query).skip(skip).limit(limit).lean();
  const totalUsers = await user.countDocuments(query);
  const totalPages = Math.ceil(totalUsers / limit);

  return { listUser, totalUsers, totalPages };
}

/**
 * function to update an user
 *
 * @param {string} userId User's id
 * @param {object} userInfo User detail
 * @returns {object} the updated user
 */
async function update(userId, userInfo) {
  const data = await user.findByIdAndUpdate(
    userId,
    userInfo,
    { updatedAt: Number(Date.now) },
    {
      new: true,
    }
  );
  return data;
}

/**
 * function to delete an user profile
 *
 * @param {string} userId User's id
 * @returns {object} the deleted user details
 */
async function deleteUser(userId) {
  const userInfo = {
    email: null,
    mobile: null,
    password: null,
    isDeleted: true,
  };
  const data = await user.findByIdAndUpdate(
    userId,
    userInfo,
    { updatedAt: Number(Date.now) },
    {
      new: true,
    }
  );

  return data;
}

module.exports = {
  getDetail: getDetail,
  create: create,
  list: list,
  update: update,
  deleteUser: deleteUser,
};
