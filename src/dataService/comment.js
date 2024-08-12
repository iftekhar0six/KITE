"use strict";

const comment = require("../models/comment");

/**
 * used for filtering the comment collection by filter
 *
 * @param {object} filter
 * @returns the comment detail
 */
async function getDetail(filter) {
  const detail = await comment.findOne(filter);
  return detail;
}

/**
 * function used to create comment
 *
 * @param {object} commentInfo
 * @returns the saved comment detail
 */
async function create(commentInfo) {
  const newData = new comment(commentInfo);
  const data = await newData.save();
  return data;
}

/**
 * function to get comment list
 *
 * @param {number} page - Page number
 * @returns {object} the comment list
 */
async function list(page, limit) {
  const skip = (page - 1) * limit;

  const listComment = await comment.aggregate([
    {
      $lookup: {
        from: "users",
        localField: "userId",
        foreignField: "_id",
        as: "user",
      },
    },
    {
      $lookup: {
        from: "categories",
        localField: "categoryId",
        foreignField: "_id",
        as: "category",
      },
    },
    {
      $lookup: {
        from: "subcategories",
        localField: "subCategoryId",
        foreignField: "_id",
        as: "subCategory",
      },
    },
    {
      $lookup: {
        from: "posts",
        localField: "postId",
        foreignField: "_id",
        as: "post",
      },
    },
    { $unwind: "$user" },
    { $unwind: "$category" },
    { $unwind: "$subCategory" },
    { $unwind: "$post" },
    {
      $addFields: {
        userDetail: {
          id: "$user._id",
          email: "$user.email",
        },
        categoryDetail: {
          id: "$category._id",
          name: "$category.name",
        },
        subCategoryDetail: {
          id: "$subCategory._id",
          name: "$subCategory.name",
        },
        postDetail: {
          id: "$post._id",
        },
      },
    },
    {
      $project: {
        userDetail: 1,
        categoryDetail: 1,
        subCategoryDetail: 1,
        postDetail: 1,
      },
    },
    { $skip: skip },
    { $limit: limit },
  ]);

  const totalComment = await comment.countDocuments();
  const totalPage = Math.ceil(totalComment / limit);

  return { listComment, totalComment, totalPage };
}

/**
 * function for updating comment
 *
 * @param {string} commentId
 * @param {object} commentInfo
 * @returns {object} the updated comment
 */
async function update(commentId, commentInfo) {
  const data = await comment.findByIdAndUpdate(commentId, commentInfo,{ updatedAt: Number(Date.now) }, {
    new: true,
  });
  return data;
}

/**
 * function to delete comment
 *
 * @param {string} commentId
 * @returns {object} the deleted comment
 */
async function deleteComment(commentId) {
  const data = await comment.findByIdAndDelete(commentId);
  return data;
}

module.exports = {
  getDetail: getDetail,
  create: create,
  list: list,
  update: update,
  deleteComment: deleteComment,
};
