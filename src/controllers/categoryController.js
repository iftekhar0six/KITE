"use strict";

const categoryRepo = require("../dataService/category");
const service = require("../helpers/service");
const { HttpStatus } = require("../utils/httpStatus");
const { Msg } = require("../utils/messageCode");

module.exports = {
  /**
   * function to create a category
   *
   * @param {string} req.body.name - The category name.
   * @param {string} req.body.description - The category description.
   * @param {string} req.user.id - The category creator.
   * @returns {object} details of create category
   */
  create: async function (req, res) {
    try {
      if (service.hasValidatorErrors(req, res)) {
        return;
      }
      const detail = {
        name: req.body.name,
        description: req.body.description,
        userId: req.user.id,
      };
      const isCategoryExist = await categoryRepo.getDetail({
        name: detail.name,
      });
      if (isCategoryExist) {
        return res.send(
          service.prepareResponse(HttpStatus.ALREADY_EXIST, Msg.CATEGORY_EXIST)
        );
      }
      const newCategory = await categoryRepo.create(detail);
      return res.send(
        service.prepareResponse(HttpStatus.SUCCESS, Msg.CATEGORY_CREATED, {
          id: newCategory.id,
        })
      );
    } catch (error) {
      return res.send(
        service.prepareResponse(
          HttpStatus.INTERNAL_SERVER_ERROR,
          Msg.INTERNAL_SERVER_ERROR
        )
      );
    }
  },

  /**
   * function to find category by id
   *
   * @param {string} req.params.id - The category id.
   * @returns {object} the details of category
   */
  findCategory: async function (req, res) {
    try {
      if (service.hasValidatorErrors(req, res)) {
        return;
      }
      const id = req.params.id;
      const isCategory = await categoryRepo.getDetail({ _id: id });
      if (!isCategory) {
        return res.send(
          service.prepareResponse(HttpStatus.NOT_FOUND, Msg.CATEGORY_NOT_FOUND)
        );
      }
      return res.send(
        service.prepareResponse(HttpStatus.SUCCESS, Msg.SUCCESS, {
          id: isCategory.id,
        })
      );
    } catch (error) {
      return res.send(
        service.prepareResponse(
          HttpStatus.INTERNAL_SERVER_ERROR,
          Msg.INTERNAL_SERVER_ERROR
        )
      );
    }
  },

  /**
   * function to get list of categories, search functionality added
   *
   * @param {number} req.query.page - Page number.
   * @param {string} req.query.limit - Content per page.
   * @param {string} req.query.searchTerm - The search term.
   * @returns {object} the category list
   */
  listCategory: async function (req, res) {
    try {
      const page = req.query.page || 1;
      const limit = Number(req.query.limit) || 5;
      const searchTerm = req.query.searchTerm;

      const { listCategory, totalCategory, totalPage } =
        await categoryRepo.list(searchTerm, page, limit);

      const response = {
        totalPage: totalPage,
        perPage: limit,
        totalCategory: totalCategory,
        searchTerm: searchTerm,
        listCategory: listCategory,
      };

      return res.send(
        service.prepareResponse(HttpStatus.SUCCESS, Msg.SUCCESS, response)
      );
    } catch (error) {
      return res.send(
        service.prepareResponse(
          HttpStatus.INTERNAL_SERVER_ERROR,
          Msg.INTERNAL_SERVER_ERROR
        )
      );
    }
  },

  /**
   * function to update a category
   *
   * @param {string} req.params.id - The category id.
   * @param {string} req.body.name - The category name.
   * @param {string} req.body.description - The category description.
   * @param {string} req.user.id - The category creator.
   * @returns {object} details of updated category
   */
  updateCategory: async function (req, res) {
    try {
      if (service.hasValidatorErrors(req, res)) {
        return;
      }
      const categoryId = req.params.id;
      const detail = {
        name: req.body.name,
        description: req.body.description,
        userId: req.user.id,
      };
      const isCategory = await categoryRepo.getDetail({ _id: categoryId });
      if (!isCategory) {
        return res.send(
          service.prepareResponse(HttpStatus.NOT_FOUND, Msg.CATEGORY_NOT_FOUND)
        );
      }
      if (detail.name) {
        return res.send(
          service.prepareResponse(
            HttpStatus.BAD_REQUEST,
            Msg.CATEGORY_BAD_CHANGE
          )
        );
      }

      const updatedCategory = await categoryRepo.update(categoryId, detail);
      if (!updatedCategory) {
        return res.send(
          service.prepareResponse(
            HttpStatus.BAD_REQUEST,
            Msg.CATEGORY_NOT_UPDATE
          )
        );
      }

      return res.send(
        service.prepareResponse(HttpStatus.SUCCESS, Msg.CATEGORY_UPDATED, {
          id: updatedCategory.id,
        })
      );
    } catch (error) {
      return res.send(
        service.prepareResponse(
          HttpStatus.INTERNAL_SERVER_ERROR,
          Msg.INTERNAL_SERVER_ERROR
        )
      );
    }
  },

  /**
   * function to delete category
   *
   * @param {string} req.params.id - The category id.
   * @returns {object} the details of deleted category
   */
  deleteCategory: async function (req, res) {
    try {
      if (service.hasValidatorErrors(req, res)) {
        return;
      }
      const categoryId = req.params.id;
      const isCategory = await categoryRepo.getDetail({ _id: categoryId });
      if (!isCategory) {
        return res.send(
          service.prepareResponse(HttpStatus.NOT_FOUND, Msg.CATEGORY_NOT_FOUND)
        );
      }

      const deleteCategory = await categoryRepo.deleteCategory(categoryId);
      if (!deleteCategory) {
        return res.send(
          service.prepareResponse(
            HttpStatus.BAD_REQUEST,
            Msg.CATEGORY_NOT_DELETE
          )
        );
      }

      return res.send(
        service.prepareResponse(HttpStatus.SUCCESS, Msg.CATEGORY_DELETED, {
          id: deleteCategory.id,
        })
      );
    } catch (error) {
      return res.send(
        service.prepareResponse(
          HttpStatus.INTERNAL_SERVER_ERROR,
          Msg.INTERNAL_SERVER_ERROR
        )
      );
    }
  },
};
