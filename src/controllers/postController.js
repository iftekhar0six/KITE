"use strict";

const postRepo = require("../dataService/post");
const service = require("../helpers/service");
const { HttpStatus } = require("../utils/httpStatus");
const { Msg } = require("../utils/messageCode");

module.exports = {
  /**
   * function to create a post
   *
   * @param {string} req.body.content - The post content.
   * @param {string} req.body.userId - The post creator.
   * @param {string} req.body.categoryId - The category id.
   * @param {string} req.body.subCategoryId - The subCategory id.
   * @returns {object} details of create post
   */
  create: async function (req, res) {
    try {
      if (service.hasValidatorErrors(req, res)) {
        return;
      }
      const detail = {
        content: req.body.content,
        userId: req.body.userId,
        categoryId: req.body.categoryId,
        subCategoryId: req.body.subCategoryId,
      };

      const newPost = await postRepo.create(detail);
      return res.send(
        service.prepareResponse(HttpStatus.SUCCESS, Msg.POST_CREATED, {
          id: newPost.id,
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
   * function to find post by id
   *
   * @param {string} req.params.id - The post id.
   * @returns {object} the details of post
   */
  findPost: async function (req, res) {
    try {
      if (service.hasValidatorErrors(req, res)) {
        return;
      }
      const id = req.params.id;
      const isPost = await postRepo.getDetail({ _id: id });
      if (!isPost) {
        return res.send(
          service.prepareResponse(HttpStatus.NOT_FOUND, Msg.POST_NOT_FOUND)
        );
      }
      return res.send(
        service.prepareResponse(HttpStatus.SUCCESS, Msg.SUCCESS, {
          id: isPost.id,
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
   * function to get list of post, search functionality added
   *
   * @param {number} req.query.page - Page number.
   * @param {string} req.query.limit - Content per page.
   * @param {string} req.query.searchTerm - The search term.
   * @returns {object} the post list
   */
  listPost: async function (req, res) {
    try {
      const page = req.query.page || 1;
      const limit = Number(req.query.limit) || 5;

      const { listPost, totalPost, totalPage } = await postRepo.list(
        page,
        limit
      );

      const response = {
        totalPage: totalPage,
        perPage: limit,
        totalPost: totalPost,
        listPost: listPost,
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
   * function to update a post
   *
   * @param {string} req.params.id - The post id.
   * @param {string} req.body.content - The post content.
   * @param {string} req.body.userId - The post creator.
   * @param {string} req.body.categoryId - The category id.
   * @param {string} req.body.subCategoryId - The subCategory id.
   * @returns {object} details of updated post
   */
  updatePost: async function (req, res) {
    try {
      if (service.hasValidatorErrors(req, res)) {
        return;
      }
      const postId = req.params.id;
      const detail = {
        content: req.body.content,
        userId: req.body.userId,
        categoryId: req.body.categoryId,
        subCategoryId: req.body.subCategoryId,
      };
      const isPost = await postRepo.getDetail({ _id: postId });
      if (!isPost) {
        return res.send(
          service.prepareResponse(HttpStatus.NOT_FOUND, Msg.POST_NOT_FOUND)
        );
      }
      if (detail.userId || detail.categoryId || detail.subCategoryId) {
        return res.send(
          service.prepareResponse(HttpStatus.BAD_REQUEST, Msg.POST_BAD_CHANGE)
        );
      }

      const updatePost = await postRepo.update(postId, detail);
      if (!updatePost) {
        return res.send(
          service.prepareResponse(HttpStatus.BAD_REQUEST, Msg.POST_NOT_UPDATE)
        );
      }

      return res.send(
        service.prepareResponse(HttpStatus.SUCCESS, Msg.POST_UPDATED, {
          id: updatePost.id,
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
   * function to delete post
   *
   * @param {string} req.params.id - The post id.
   * @returns {object} the details of deleted post
   */
  deletePost: async function (req, res) {
    try {
      if (service.hasValidatorErrors(req, res)) {
        return;
      }
      const postId = req.params.id;
      const isPost = await postRepo.getDetail({
        _id: postId,
      });
      if (!isPost) {
        return res.send(
          service.prepareResponse(HttpStatus.NOT_FOUND, Msg.POST_NOT_FOUND)
        );
      }

      const deletePost = await postRepo.deletePost(postId);
      if (!deletePost) {
        return res.send(
          service.prepareResponse(HttpStatus.BAD_REQUEST, Msg.POST_NOT_DELETE)
        );
      }

      return res.send(
        service.prepareResponse(HttpStatus.SUCCESS, Msg.POST_DELETED, {
          id: deletePost.id,
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
