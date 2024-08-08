"use strict";

const commentRepo = require("../dataService/comment");
const service = require("../helpers/service");
const { HttpStatus } = require("../utils/httpStatus");
const { Msg } = require("../utils/messageCode");

module.exports = {
  /**
   * function to create a comment
   *
   * @param {string} req.body.content - The comment content.
   * @param {string} req.body.userId - The comment creator.
   * @param {string} req.body.categoryId - The category id.
   * @param {string} req.body.subCategoryId - The subCategory id.
   * @param {string} req.body.postId - The post id.
   * @returns {object} details of create comment
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
        postId: req.body.postId,
      };

      const newComment = await commentRepo.create(detail);
      return res.send(
        service.prepareResponse(HttpStatus.SUCCESS, Msg.COMMENT_CREATED, {
          id: newComment.id,
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
   * function to find comment by id
   *
   * @param {string} req.params.id - The comment id.
   * @returns {object} the details of comment
   */
  findComment: async function (req, res) {
    try {
      if (service.hasValidatorErrors(req, res)) {
        return;
      }
      const id = req.params.id;
      const isComment = await commentRepo.getDetail({ _id: id });
      if (!isComment) {
        return res.send(
          service.prepareResponse(HttpStatus.NOT_FOUND, Msg.COMMENT_NOT_FOUND)
        );
      }
      return res.send(
        service.prepareResponse(HttpStatus.SUCCESS, Msg.SUCCESS, {
          id: isComment.id,
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
   * function to get list of comment
   *
   * @param {number} req.query.page - Page number.
   * @param {string} req.query.limit - Content per page.
   * @returns {object} the comment list
   */
  listComment: async function (req, res) {
    try {
      const page = req.query.page || 1;
      const limit = Number(req.query.limit) || 5;

      const { listComment, totalComment, totalPage } = await commentRepo.list(
        page,
        limit
      );

      const response = {
        totalPage: totalPage,
        perPage: limit,
        totalComment: totalComment,
        listComment: listComment,
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
   * function to update a comment
   *
   * @param {string} req.params.id - The comment id.
   * @param {string} req.body.content - The comment content.
   * @param {string} req.body.userId - The comment creator.
   * @param {string} req.body.categoryId - The category id.
   * @param {string} req.body.subCategoryId - The subCategory id.
   * @param {string} req.body.postId - The post id.
   * @returns {object} details of updated comment
   */
  updateComment: async function (req, res) {
    try {
      if (service.hasValidatorErrors(req, res)) {
        return;
      }
      const commentId = req.params.id;
      const detail = {
        content: req.body.content,
        userId: req.body.userId,
        categoryId: req.body.categoryId,
        subCategoryId: req.body.subCategoryId,
        postId: req.body.postId,
      };
      const isComment = await commentRepo.getDetail({
        _id: commentId,
      });
      if (!isComment) {
        return res.send(
          service.prepareResponse(HttpStatus.NOT_FOUND, Msg.COMMENT_NOT_FOUND)
        );
      }
      if (
        detail.userId ||
        detail.categoryId ||
        detail.subCategoryId ||
        detail.postId
      ) {
        return res.send(
          service.prepareResponse(
            HttpStatus.BAD_REQUEST,
            Msg.COMMENT_BAD_CHANGE
          )
        );
      }

      const updateComment = await commentRepo.update(commentId, detail);
      if (!updateComment) {
        return res.send(
          service.prepareResponse(
            HttpStatus.BAD_REQUEST,
            Msg.COMMENT_NOT_UPDATE
          )
        );
      }

      return res.send(
        service.prepareResponse(HttpStatus.SUCCESS, Msg.COMMENT_UPDATED, {
          id: updateComment.id,
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
   * function to delete comment
   *
   * @param {string} req.params.id - The comment id.
   * @returns {object} the details of deleted comment
   */
  deleteComment: async function (req, res) {
    try {
      if (service.hasValidatorErrors(req, res)) {
        return;
      }
      const commentId = req.params.id;
      const isComment = await commentRepo.getDetail({
        _id: commentId,
      });
      if (!isComment) {
        return res.send(
          service.prepareResponse(HttpStatus.NOT_FOUND, Msg.COMMENT_NOT_FOUND)
        );
      }

      const deleteComment = await commentRepo.deleteComment(commentId);
      if (!deleteComment) {
        return res.send(
          service.prepareResponse(
            HttpStatus.BAD_REQUEST,
            Msg.COMMENT_NOT_DELETE
          )
        );
      }

      return res.send(
        service.prepareResponse(HttpStatus.SUCCESS, Msg.COMMENT_DELETED, {
          id: deleteComment.id,
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
