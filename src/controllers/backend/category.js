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
      const limit = Number(req.query.limit) || 9;
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
      return res.render("admin/category/detail", {
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

  /**
   * function to add new category
   */
  createCategory: async function (req, res, next) {
    try {
      // const detail = {
      //   name: "Todays new",
      //   description: "This one is also new",
      //   userId: "67122ae4ef7e0e5547131a17",
      //   // userId: req.user.id,
      // };

      // const createCategory = await categoryRepo.create(detail);

      return res.render("admin/category/add", { title: "Category", route: category });
    } catch (error) {
      next(error);
    }
  },

  /**
   * find category by id using mongo id
   */
  findCategory: async function (req, res, next) {
    try {
      const id = req.params.id;
      const categoryExist = await category.findById(id);

      if (!categoryExist) {
        return res.send("Category not found");
      }
      return res.render("admin/category/update", { title: "Update Category", route: category, category: categoryExist });
    } catch (error) {
      next(error);
    }
  },

  /**
   * function to update category
   */
  updateCategory: async function (req, res, next) {
    try {
      return res.redirect("admin/category", { title: "Update Category", route: category });
    } catch (error) {
      next(error);
    }
  },
};
