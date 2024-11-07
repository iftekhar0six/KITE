"use strict";

const category = require("../../models/category");
const user = require("../../models/user");
const categoryRepo = require("../../dataService/backend/category");
const { status } = require("../../helpers/enum");

module.exports = {
  /**
   * Function to list categories
   */
  listCategory: async function (req, res, next) {
    try {
      const page = req.query.page || 1;
      const limit = Number(req.query.limit) || 5;
      const searchTerm = req.query.searchTerm || "";

      const { listCategory, totalCategory, totalCategoryCount, totalPage } = await categoryRepo.list(searchTerm, page, limit);

      const lastMonth = new Date();
      lastMonth.setMonth(lastMonth.getMonth() - 1);

      const lastYear = new Date();
      lastYear.setFullYear(lastYear.getFullYear() - 1);

      const createdLastMonth = await category.countDocuments({
        createdAt: { $gte: lastMonth },
        status: 1,
      });

      const createdLastYear = await category.countDocuments({
        createdAt: { $gte: lastYear },
        status: 1,
      });

      const deactivatedLastMonth = await category.countDocuments({
        updatedAt: { $gte: lastMonth },
        status: 0,
      });

      const deactivatedLastYear = await category.countDocuments({
        updatedAt: { $gte: lastYear },
        status: 0,
      });

      const createdMonthProgress = (totalCategory / createdLastMonth) * 100;

      const createdYearProgress = (totalCategory / createdLastYear) * 100;

      const deactivatedMonthProgress = (deactivatedLastMonth / totalCategoryCount) * 100;

      const deactivatedYearProgress = (deactivatedLastMonth / totalCategoryCount) * 100;

      const response = {
        totalPage: totalPage,
        perPage: limit,
        totalCategory: totalCategory,
        searchTerm: searchTerm,
        currentPage: page,
        listCategory: listCategory,
        /**
         * statistics
         */
        createdLastMonth,
        createdLastYear,
        deactivatedLastMonth,
        deactivatedLastYear,
        createdMonthProgress,
        deactivatedMonthProgress,
        createdYearProgress,
        deactivatedYearProgress,
      };

      // Render the EJS template and pass the response data
      return res.render("admin/category", {
        response,
        title: "Category",
        route: "category",
      });
    } catch (error) {
      next(error);
    }
  },

  /**
   * function for delete category
   */
  deleteCategory: async function (req, res, next) {
    try {
      const id = req.params.id;

      const newData = { status: 0, isDeleted: true };

      await category.findByIdAndUpdate(id, newData, { new: true });
      return res.redirect("/admin/category");
    } catch (error) {
      console.error(error);
      next(error);
    }
  },

  userRoute: async function (req, res, next) {
    try {
      const userId = req.params.userid; // Get user ID from the form input
      const userExist = await user.findById(userId);

      if (!userExist) {
        return req.send("Not Found in database");
      }

      return res.render("admin/update", {
        title: "Update",
        route: "update",
        user: userExist,
      });
      // return res.render("admin/update", { title: "Update user", user: userExist });
    } catch (error) {
      next(error);
    }
  },

  /**
   * function to add new category
   */
  createCategory: async function (req, res, next) {
    try {
      const detail = {
        name: "The name is confidential",
        description: "This is confidential too",
        userId: "67122ae4ef7e0e5547131a17",
        // userId: req.user.id,
      };
      console.log(detail)

      const createCategory = await categoryRepo.create(detail);

      return res.render("category/add-category", { title: "Category", route: category, createCategory });
    } catch (error) {
      next(error);
    }
  },
};
