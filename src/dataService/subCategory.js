"use strict";

const subCategory = require("../models/subCategory");

/**
 * used for filtering the subCategory collection by filter
 *
 * @param {object} filter
 * @returns the subCategory detail
 */
async function getDetail(filter) {
  const detail = await subCategory.findOne(filter);
  return detail;
}

/**
 * function used to create subCategory
 *
 * @param {object} subCategoryInfo
 * @returns the saved subCategory detail
 */
async function create(subCategoryInfo) {
  const newData = new subCategory(subCategoryInfo);
  const data = await newData.save();
  return data;
}

/**
 * function to get subCategory list and search by name
 *
 * @param {number} page - Page number
 * @param {string} searchTerm - the searchTerm
 * @returns {object} the subCategory list
 */
async function list(searchTerm, page, limit) {
  const skip = (page - 1) * limit;
  let query = {};

  if (searchTerm) {
    query = {
      $or: [{ name: { $regex: searchTerm, $options: "i" } }],
    };
  }

  const listSubCategory = await subCategory.aggregate([
    { $match: query },

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
    { $unwind: { path: "$user", preserveNullAndEmptyArrays: true } },
    { $unwind: { path: "$category", preserveNullAndEmptyArrays: true } },
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
      },
    },
    {
      $project: {
        userDetail: 1,
        categoryDetail: 1,
      },
    },
    { $skip: skip },
    { $limit: limit },
  ]);

  const totalSubCategory = await subCategory.find(query).countDocuments();
  const totalPage = Math.ceil(totalSubCategory / limit);

  return { listSubCategory, totalSubCategory, totalPage };
}

/**
 * function for updating subCategory
 *
 * @param {string} subCategoryId
 * @param {object} subCategoryInfo
 * @returns {object} the updated subCategory
 */
async function update(subCategoryId, subCategoryInfo) {
  const data = await subCategory.findByIdAndUpdate(
    subCategoryId,
    subCategoryInfo,
    {
      new: true,
    }
  );
  return data;
}

/**
 * function to delete subCategory
 *
 * @param {string} subCategoryId
 * @returns {object} the deleted subCategory
 */
async function deleteSubCategory(subCategoryId) {
  const data = await subCategory.findByIdAndDelete(subCategoryId);
  return data;
}

module.exports = {
  getDetail: getDetail,
  create: create,
  list: list,
  update: update,
  deleteSubCategory: deleteSubCategory,
};
