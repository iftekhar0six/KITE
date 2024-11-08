"use strict";

const user = require("../../models/user");
const category = require("../../models/category");
const subCategory = require("../../models/subCategory");
const post = require("../../models/post");

module.exports = {
  /**
   * Admin Registration
   */
  registerAdmin: async function (req, res, next) {
    try {
      return res.render("admin/register", {
        title: "Register",
        route: "register",
      });
    } catch (error) {
      next(error);
    }
  },

  /**
   * User list with pagination
   */
  userCount: async function (req, res, next) {
    try {
      const accountsCreatedLastYear = await user.countDocuments({
        createdAt: {
          $gte: new Date(new Date().setFullYear(new Date().getFullYear() - 1)),
        },
      });
      const accountsDeactivatedLastYear = await user.countDocuments({
        updatedAt: {
          $gte: new Date(new Date().setFullYear(new Date().getFullYear() - 1)),
        },
        isDeleted: true,
      });

      const totalUserAccounts = await user.countDocuments({
        type: 1,
        isDeleted: false,
      });
      const totalAdminAccounts = await user.countDocuments({
        type: 2,
        isDeleted: false,
      });

      const totalRegistration = await user.countDocuments({ isDeleted: false });
      const totalCategory = await category.countDocuments({ isDeleted: false });
      const totalSubCategory = await subCategory.countDocuments({ isDeleted: false });
      const totalPost = await post.countDocuments({ isDeleted: false });

      return res.render("admin/home", {
        title: "Dashboard",
        route: "home",
        totalCategory: Math.round(totalCategory),
        totalSubCategory: Math.round(totalSubCategory),
        totalPost: Math.round(totalPost),
        totalRegistration: Math.round(totalRegistration),
        totalUserAccounts: Math.round(totalUserAccounts),
        totalAdminAccounts: Math.round(totalAdminAccounts),
        accountsCreatedLastYear: Math.round(accountsCreatedLastYear),
        accountsDeactivatedLastYear: Math.round(accountsDeactivatedLastYear),
      });
    } catch (error) {
      next(error);
    }
  },

  /**
   * User list with pagination
   */
  listUser: async function (req, res, next) {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = 10;
      const skip = (page - 1) * limit;

      const listOfUser = await user.find({ isDeleted: false }).skip(skip).limit(limit);

      const totalUsers = await user.countDocuments({ isDeleted: false });

      const totalPages = Math.ceil(totalUsers / limit);

      const totalUserAccounts = await user.countDocuments({
        type: 1,
        isDeleted: false,
      });
      const totalAdminAccounts = await user.countDocuments({
        type: 2,
        isDeleted: false,
      });

      // Compute user account statistics based on createdAt and updatedAt
      const accountsCreatedLastMonth = await user.countDocuments({
        createdAt: {
          $gte: new Date(new Date().setMonth(new Date().getMonth() - 1)),
        },
      });

      const accountsCreatedLastYear = await user.countDocuments({
        createdAt: {
          $gte: new Date(new Date().setFullYear(new Date().getFullYear() - 1)),
        },
      });

      const accountsDeactivatedLastMonth = await user.countDocuments({
        updatedAt: {
          $gte: new Date(new Date().setMonth(new Date().getMonth() - 1)),
        },
        isDeleted: true,
      });

      const accountsDeactivatedLastYear = await user.countDocuments({
        updatedAt: {
          $gte: new Date(new Date().setFullYear(new Date().getFullYear() - 1)),
        },
        isDeleted: true,
      });

      return res.render("admin/user", {
        listOfUser,
        title: "User",
        route: "user",
        currentPage: page,
        totalPages,
        totalUserAccounts: Math.round(totalUserAccounts),
        totalAdminAccounts: Math.round(totalAdminAccounts),
        accountsCreatedLastMonth: Math.round(accountsCreatedLastMonth),
        accountsCreatedLastYear: Math.round(accountsCreatedLastYear),
        accountsDeactivatedLastMonth: Math.round(accountsDeactivatedLastMonth),
        accountsDeactivatedLastYear: Math.round(accountsDeactivatedLastYear),
      });
    } catch (error) {
      next(error);
    }
  },

  userRoute: async function (req, res, next) {
    try {
      const userId = req.params.userid;
      const userExist = await user.findById(userId);

      if (!userExist) {
        return req.send("Not Found in database");
      }

      return res.render("admin/update", {
        title: "Update",
        route: "update",
        user: userExist,
      });
    } catch (error) {
      next(error);
    }
  },

  /**
   * Update user by id
   */
  updateUser: async function (req, res, next) {
    try {
      const userId = req.params.userid;

      const updates = {
        fName: req.body.fName,
        lName: req.body.lName,
        email: req.body.email,
        mobile: req.body.mobile,
        gender: req.body.gender,
        updatedAt: Date.now(),
      };

      /**
       * Optionals
       */
      const page = parseInt(req.query.page) || 1;
      const limit = 10;
      const skip = (page - 1) * limit;

      const listOfUser = await user.find({ isDeleted: false }).skip(skip).limit(limit);

      const totalUsers = await user.countDocuments({ isDeleted: false });

      const totalPages = Math.ceil(totalUsers / limit);

      const totalUserAccounts = await user.countDocuments({
        type: 1,
        isDeleted: false,
      });
      const totalAdminAccounts = await user.countDocuments({
        type: 2,
        isDeleted: false,
      });

      // Compute user account statistics based on createdAt and updatedAt
      const accountsCreatedLastMonth = await user.countDocuments({
        createdAt: {
          $gte: new Date(new Date().setMonth(new Date().getMonth() - 1)),
        },
      });

      const accountsCreatedLastYear = await user.countDocuments({
        createdAt: {
          $gte: new Date(new Date().setFullYear(new Date().getFullYear() - 1)),
        },
      });

      const accountsDeactivatedLastMonth = await user.countDocuments({
        updatedAt: {
          $gte: new Date(new Date().setMonth(new Date().getMonth() - 1)),
        },
        isDeleted: true,
      });

      const accountsDeactivatedLastYear = await user.countDocuments({
        updatedAt: {
          $gte: new Date(new Date().setFullYear(new Date().getFullYear() - 1)),
        },
        isDeleted: true,
      });

      // Handle image upload if a file is sent
      if (req.file) {
        updates.image = req.file.path; // Update image path if file is uploaded
      }

      // Find the user by ID and update
      const updatedUser = await user.findByIdAndUpdate(userId, updates, {
        new: true,
      });

      if (!updatedUser) {
        return res.status(404).send("User not found");
      }

      return res.render("admin/user", {
        title: "User",
        route: "user",
        user: updatedUser,
        listOfUser,
        currentPage: page,
        totalPages,
        totalUserAccounts: Math.round(totalUserAccounts),
        totalAdminAccounts: Math.round(totalAdminAccounts),
        accountsCreatedLastMonth: Math.round(accountsCreatedLastMonth),
        accountsCreatedLastYear: Math.round(accountsCreatedLastYear),
        accountsDeactivatedLastMonth: Math.round(accountsDeactivatedLastMonth),
        accountsDeactivatedLastYear: Math.round(accountsDeactivatedLastYear),
      });
    } catch (error) {
      console.error(error);
      next(error);
    }
  },

  /**
   * function to delete user
   */
  deleteUser: async function (req, res, next) {
    try {
      const userId = req.params.userid;

      const newData = {
        email: null,
        mobile: null,
        password: null,
        isDeleted: true,
      };
      await user.findByIdAndUpdate(userId, newData, { new: true });

      return res.redirect("/admin/user");
    } catch (error) {
      console.error(error);
      next(error);
    }
  },
};
