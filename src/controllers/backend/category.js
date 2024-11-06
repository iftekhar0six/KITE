"use strict";

const category = require("../../models/category");
const categoryRepo = require("../../dataService/backend/category");

module.exports = {
  /**
   * Function to list categories
   */
  listCategory: async function (req, res, next) {
    try {
      const page = req.query.page || 1;
      const limit = Number(req.query.limit) || 5;
      const searchTerm = req.query.searchTerm || "";

      const { listCategory, totalCategory, totalPage } = await categoryRepo.list(searchTerm, page, limit);

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

      const createdMonthProgress = (createdLastMonth / createdLastYear) * 100;

      const createdYearProgress = (createdLastMonth / createdLastYear) * 100;

      const deactivatedMonthProgress = (deactivatedLastMonth / deactivatedLastYear) * 100;

      const deactivatedYearProgress = (deactivatedLastMonth / deactivatedLastYear) * 100;

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

      const newData = { isDeleted: true };

      await category.findByIdAndUpdate(id, newData, { new: true });
      return res.redirect("/admin/category");
    } catch (error) {
      console.error(error);
      next(error);
    }
  },
};
