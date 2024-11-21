"use strict";

const category = require("../../models/category");
const user = require("../../models//user");

/**
 * function to create category
 *
 * @param {Object} data
 * @returns saved data
 */
async function create(data) {
  const newData = new category(data);
  const saveData = await newData.save();
  return saveData;
}

/**
 * function to get category list and search by name
 *
 * @param {string} searchTerm - the searchTerm
 * @param {number} page - Page number
 * @param {number} limit - Number of items per page
 * @returns {object} the category list
 */
async function list(searchTerm, page, limit) {
  const skip = (page - 1) * limit;
  let query = { status: 1, isDeleted: false };

  if (searchTerm) {
    query = {
      $and: [{ name: { $regex: searchTerm, $options: "i" } }],
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
    { $unwind: { path: "$user", preserveNullAndEmptyArrays: true } },
    {
      $addFields: {
        userDetail: {
          id: "$user._id",
          fName: "$user.fName",
          lName: "$user.lName",
          email: "$user.email",
          mobile: "$user.mobile",
        },
      },
    },
    {
      $project: {
        name: 1,
        userDetail: 1,
      },
    },
    { $skip: skip },
    { $limit: limit },
  ]);

  const totalCategory = await category.find(query).countDocuments();
  const totalCategoryCount = await category.find().countDocuments();
  const totalPage = Math.ceil(totalCategory / limit);

  return { listCategory, totalCategory, totalCategoryCount, totalPage };
}

/**
 * function to get category details by id
 *
 * @param {object} categoryId - The category id
 * @returns {object} the category details
 */

async function getDetailsById(categoryId) {
  const categoryDetails = await category.findById(categoryId);

  const userId = categoryDetails.userId;
  const userDetails = await user.findOne({ _id: userId });

  return { categoryDetails, userDetails };
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


module.exports = {
  list: list,
  create: create,
  getDetailsById: getDetailsById,
  update:update
};
