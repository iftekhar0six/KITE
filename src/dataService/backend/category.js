"use strict";

const category = require("../../models/category");

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
  let query = { status: 1 };

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
    { $unwind: { path: "$user", preserveNullAndEmptyArrays: true } },
    {
      $addFields: {
        userDetail: {
          id: "$user._id",
          firstName: "$user.fName",
          lastName: "$user.lName",
          email: "$user.email",
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
  const totalPage = Math.ceil(totalCategory / limit);

  return { listCategory, totalCategory, totalPage };
}

module.exports = { list };
