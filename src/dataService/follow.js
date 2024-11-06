"use strict";

const follow = require("../models/follow");

/**
 * function used to filter follow collection
 *
 * @param {object} filter
 * @returns the follow detail
 */
async function getDetail(filter) {
  const detail = await follow.findOne(filter).exec();
  return detail;
}

/**
 * function used to create follow
 *
 * @param {object} followInfo
 * @returns the saved follow detail
 */
async function toFollow(followInfo) {
  const newData = new follow(followInfo);
  const data = await newData.save();
  return data;
}

/**
 * function for delete follow
 *
 * @param {string} followId
 * @returns {object} the deleted follow
 */
async function unFollow(followId) {
  const data = await follow.findByIdAndDelete(followId);
  return data;
}

/**
 * function to list follow
 *
 * @param {number} page - Page number
 * @param {number} limit - Document's per page
 * @returns {object} the list detail
 */
async function list(page, limit) {
  const skip = (page - 1) * limit;

  const listFollow = await follow.aggregate([
    {
      $lookup: {
        from: "users",
        localField: "followerId",
        foreignField: "_id",
        as: "follower",
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "followingId",
        foreignField: "_id",
        as: "following",
      },
    },
    { $unwind: "$follower" },
    { $unwind: "$following" },
    {
      $addFields: {
        followerDetail: { id: "$follower._id", email: "$follower.email" },
        followingDetail: { id: "$following._id", email: "$following.email" },
      },
    },
    {
      $project: {
        followerDetail: 1,
        followingDetail: 1,
      },
    },
    { $skip: skip },
    { $limit: limit },
  ]);

  const totalFollow = await follow.countDocuments();
  const totalPage = Math.ceil(totalFollow / limit);

  return { listFollow, totalFollow, totalPage };
}

module.exports = {
  getDetail: getDetail,
  toFollow: toFollow,
  unFollow: unFollow,
  list: list,
};
