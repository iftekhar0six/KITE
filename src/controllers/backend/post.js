"use strict";

const postRepo = require("../../dataService/post");

module.exports = {
  /**
   * function to create post
   */
  listPost: async function (req, res, next) {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 5;

      const { listPost, totalPost, totalPage } = await postRepo.list(page, limit);

      const response = {
        perPage: limit,
        totalPost: totalPost,
        listPost: listPost,
      };

      res.render("./admin/post/detail", {
        totalPage: totalPage,
        currentPage: page,
        title: "Post",
        route: "post",
        response,
      });
    } catch (error) {
      next(error);
    }
  },
};
