"use strict";

const subCategoryRepo = require("../dataService/subCategory");
const service = require("../helpers/service");
const { HttpStatus } = require("../utils/httpStatus");
const { Msg } = require("../utils/messageCode");

module.exports = {
  /**
   * function to create a subCategory
   *
   * @param {string} req.body.name - The subCategory name.
   * @param {string} req.body.content - The subCategory content.
   * @param {string} req.body.userId - The subCategory creator.
   * @param {string} req.body.categoryId - The subCategory id.
   * @returns {object} details of create subCategory
   */
  create: async function (req, res) {
    try {
      if (service.hasValidatorErrors(req, res)) {
        return;
      }
      const detail = {
        name: req.body.name,
        content: req.body.content,
        userId: req.body.userId,
        categoryId: req.body.categoryId,
      };
      const isSubCategoryExist = await subCategoryRepo.getDetail({
        name: detail.name,
      });
      if (isSubCategoryExist) {
        return res.send(
          service.prepareResponse(
            HttpStatus.ALREADY_EXIST,
            Msg.SUBCATEGORY_EXIST
          )
        );
      }
      const newSubCategory = await subCategoryRepo.create(detail);
      return res.send(
        service.prepareResponse(HttpStatus.SUCCESS, Msg.SUBCATEGORY_CREATED, {
          id: newSubCategory.id,
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
   * function to find subCategory by id
   *
   * @param {string} req.params.id - The subCategory id.
   * @returns {object} the details of subCategory
   */
  findSubCategory: async function (req, res) {
    try {
      if (service.hasValidatorErrors(req, res)) {
        return;
      }
      const id = req.params.id;
      const isSubCategory = await subCategoryRepo.getDetail({ _id: id });
      if (!isSubCategory) {
        return res.send(
          service.prepareResponse(
            HttpStatus.NOT_FOUND,
            Msg.SUBCATEGORY_NOT_FOUND
          )
        );
      }
      return res.send(
        service.prepareResponse(HttpStatus.SUCCESS, Msg.SUCCESS, {
          id: isSubCategory.id,
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
   * function to get list of subCategory, search functionality added
   *
   * @param {number} req.query.page - Page number.
   * @param {string} req.query.limit - Content per page.
   * @param {string} req.query.searchTerm - The search term.
   * @returns {object} the subCategory list
   */
  listSubCategory: async function (req, res) {
    try {
      const page = req.query.page || 1;
      const limit = Number(req.query.limit) || 5;
      const searchTerm = req.query.searchTerm;

      const { listSubCategory, totalSubCategory, totalPage } =
        await subCategoryRepo.list(searchTerm, page, limit);

      const response = {
        totalPage: totalPage,
        perPage: limit,
        totalSubCategory: totalSubCategory,
        searchTerm: searchTerm,
        listSubCategory: listSubCategory,
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
   * function to update a subCategory
   *
   * @param {string} req.params.id - The subCategory id.
   * @param {string} req.body.name - The subCategory name.
   * @param {string} req.body.content - The subCategory content.
   * @param {string} req.body.userId - The subCategory creator.
   * @param {string} req.body.categoryId - The subCategory id.
   * @returns {object} details of updated subCategory
   */
  updateSubCategory: async function (req, res) {
    try {
      if (service.hasValidatorErrors(req, res)) {
        return;
      }
      const subCategoryId = req.params.id;
      const detail = {
        name: req.body.name,
        content: req.body.content,
        userId: req.body.userId,
        categoryId: req.body.categoryId,
      };
      const isSubCategory = await subCategoryRepo.getDetail({
        _id: subCategoryId,
      });
      if (!isSubCategory) {
        return res.send(
          service.prepareResponse(
            HttpStatus.NOT_FOUND,
            Msg.SUBCATEGORY_NOT_FOUND
          )
        );
      }
      if (detail.name || detail.userId || detail.categoryId) {
        return res.send(
          service.prepareResponse(
            HttpStatus.BAD_REQUEST,
            Msg.SUBCATEGORY_BAD_CHANGE
          )
        );
      }

      const updatedSubCategory = await subCategoryRepo.update(
        subCategoryId,
        detail
      );
      if (!updatedSubCategory) {
        return res.send(
          service.prepareResponse(
            HttpStatus.BAD_REQUEST,
            Msg.SUBCATEGORY_NOT_UPDATE
          )
        );
      }

      return res.send(
        service.prepareResponse(HttpStatus.SUCCESS, Msg.SUBCATEGORY_UPDATED, {
          id: updatedSubCategory.id,
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
   * function to delete subCategory
   *
   * @param {string} req.params.id - The subCategory id.
   * @returns {object} the details of deleted subCategory
   */
  deleteSubCategory: async function (req, res) {
    try {
      if (service.hasValidatorErrors(req, res)) {
        return;
      }
      const subCategoryId = req.params.id;
      const isSubCategory = await subCategoryRepo.getDetail({
        _id: subCategoryId,
      });
      if (!isSubCategory) {
        return res.send(
          service.prepareResponse(
            HttpStatus.NOT_FOUND,
            Msg.SUBCATEGORY_NOT_FOUND
          )
        );
      }

      const deleteSubCategory = await subCategoryRepo.deleteSubCategory(
        subCategoryId
      );
      if (!deleteSubCategory) {
        return res.send(
          service.prepareResponse(
            HttpStatus.BAD_REQUEST,
            Msg.SUBCATEGORY_NOT_DELETE
          )
        );
      }

      return res.send(
        service.prepareResponse(HttpStatus.SUCCESS, Msg.SUBCATEGORY_DELETED, {
          id: deleteSubCategory.id,
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
