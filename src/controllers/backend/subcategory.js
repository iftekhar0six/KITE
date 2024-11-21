"use strict";

const subCategoryRepo = require("../../dataService/subCategory");
const user = require("../../models/user");
const subCategory = require("../../models/subCategory");

module.exports = {
  /**
   * function to get details of sub-category
   */
  listSubCategory: async function (req, res, next) {
    try {
      const page = parseInt(req.query.page, 10) || 1;
      const limit = parseInt(req.query.limit, 10) || 5;
      const searchTerm = req.query.searchTerm || "";

      const { listSubCategory, totalSubCategory, totalPage } = await subCategoryRepo.list(searchTerm, page, limit);

      res.render("./admin/subcategory/detail", {
        title: "Sub-Category",
        route: "Sub-Category",
        currentPage: page,
        totalPage,
        searchTerm,
        listSubCategory,
        totalSubCategory,
        perPage: limit,
      });
    } catch (error) {
      next(error);
    }
  },

  /**
   * function for delete sub-category
   */
  deleteSubCategory: async function (req, res, next) {
    try {
      const id = req.params.id;
      await subCategoryRepo.deleteSubCategory(id);

      return res.redirect("/admin/sub-category");
    } catch (error) {
      console.error(error);
      next(error);
    }
  },

  /**
   * function to get subcategory details by id
   */
  update: async function (req, res, next) {
    try {
      const subcategoryId = req.params.id;
      const subCategoryDetails = await subCategory.findById(subcategoryId);

      const userId = subCategoryDetails.userId;
      const userDetails = await user.findOne({ _id: userId });

      return res.render("admin/subcategory/update", {
        title: "Update Sub-Category",
        route: "subcategory",
        subCategoryDetails,
        userDetails,
        subcategoryId,
      });
    } catch (error) {
      next(error);
    }
  },
};
