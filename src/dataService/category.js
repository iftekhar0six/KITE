"use strict";

const category = require("../models/category");

/**
 * used for filtering the category collection by filter
 *
 * @param {object} filter
 * @returns the category detail
 */
async function getDetail(filter) {
  const detail = await category.findOne(filter);
  return detail;
}

/**
 * function used to create category
 *
 * @param {object} categoryInfo
 * @returns the saved category detail
 */
async function create(categoryInfo) {
  const newData = new category(categoryInfo);
  const data = await newData.save();
  return data;
}

/**
 * function to get category list and search by name
 *
 * @param {number} page - Page number
 * @param {string} searchTerm - the searchTerm
 * @returns {object} the category list
 */
async function list(searchTerm, page, limit) {
  const skip = (page - 1) * limit;
  let query = {};

  if (searchTerm) {
    query = {
      $or: [{ name: { $regex: searchTerm, $options: "i" } }],
    };
  }

  const listCategory = await category.aggregate([
    { $match: query },

    {
      $lookup: {
        from: "users",
        localField: "userId",
        foreignField: "_id",
        as: "user",
      },
    },

    // { $unwind: "$user" },
    { $unwind: { path: "$user", preserveNullAndEmptyArrays: true } },

    {
      $addFields: {
        userDetail: {
          id: "$user._id",
          email: "$user.email",
        },
      },
    },
    {
      $project: {
        userDetail: 1,
      },
    },
    { $skip: skip },
    { $limit: limit },
  ]);

  const totalCategory = await category.find(query).countDocuments();
  const totalPage = Math.ceil(totalCategory / limit);

  return { listCategory, totalCategory, totalPage };
}

/**
 * function for updating category
 *
 * @param {string} categoryId
 * @param {object} categoryInfo
 * @returns {object} the updated category
 */
async function update(categoryId, categoryInfo) {
  const data = await category.findByIdAndUpdate(categoryId, categoryInfo, {
    new: true,
  });
  return data;
}

/**
 * function to delete category
 *
 * @param {string} categoryId
 * @returns {object} the deleted category
 */
async function deleteCategory(categoryId) {
  const data = await category.findByIdAndDelete(categoryId);
  return data;
}

module.exports = {
  getDetail: getDetail,
  create: create,
  list: list,
  update: update,
  deleteCategory: deleteCategory,
};
