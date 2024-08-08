"use strict";

const post = require("../models/post");

/**
 * used for filtering the post collection by filter
 *
 * @param {object} filter
 * @returns the post detail
 */
async function getDetail(filter) {
  const detail = await post.findOne(filter);
  return detail;
}

/**
 * function used to create post
 *
 * @param {object} postInfo
 * @returns the saved post detail
 */
async function create(postInfo) {
  const newData = new post(postInfo);
  const data = await newData.save();
  return data;
}

/**
 * function to get post list
 *
 * @param {number} page - Page number
 * @param {number} limit - Document's per page
 * @returns {object} the post list
 */
async function list(page, limit) {
  const skip = (page - 1) * limit;

  const listPost = await post.aggregate([
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

    { $unwind: "$user" },
    { $unwind: "$category" },
    { $unwind: "$subCategory" },
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
      },
    },
    {
      $project: {
        userDetail: 1,
        categoryDetail: 1,
        subCategoryDetail: 1,
      },
    },
    { $skip: skip },
    { $limit: limit },
  ]);

  const totalPost = await post.countDocuments();
  const totalPage = Math.ceil(totalPost / limit);

  return { listPost, totalPost, totalPage };
}

/**
 * function for updating post
 *
 * @param {string} postId
 * @param {object} postInfo
 * @returns {object} the updated post
 */
async function update(postId, postInfo) {
  const data = await post.findByIdAndUpdate(postId, postInfo, {
    new: true,
  });
  return data;
}

/**
 * function to delete post
 *
 * @param {string} postId
 * @returns {object} the deleted post
 */
async function deletePost(postId) {
  const data = await post.findByIdAndDelete(postId);
  return data;
}

module.exports = {
  getDetail: getDetail,
  create: create,
  list: list,
  update: update,
  deletePost: deletePost,
};
