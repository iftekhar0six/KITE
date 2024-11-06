"use strict";

const followRepo = require("../dataService/follow");
const service = require("../helpers/service");
const { HttpStatus } = require("../utils/httpStatus");
const { Msg } = require("../utils/messageCode");

module.exports = {
  /**
   * function for following
   *
   * @param {string} req.user.id  The user's id
   * @param {string} req.body.followingId  Another user's id to follow
   * @returns the follower content
   */
  follower: async function (req, res) {
    try {
      if (service.hasValidatorErrors(req, res)) {
        return;
      }
      const detail = {
        followerId: req.user.id,
        followingId: req.body.followingId,
      };

      if (detail.followerId === detail.followingId) {
        return res.send(
          service.prepareResponse(HttpStatus.SUCCESS, Msg.CANT_FOLLOW)
        );
      }

      const isFollowed = await followRepo.getDetail(detail);
      if (isFollowed) {
        const unFollow = await followRepo.unFollow(isFollowed.id);
        return res.send(
          service.prepareResponse(HttpStatus.SUCCESS, Msg.UNFOLLOW)
        );
      }

      const follow = await followRepo.toFollow(detail);
      return res.send(service.prepareResponse(HttpStatus.SUCCESS, Msg.FOLLOW));
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
   * function for list follower
   *
   * @param {number} req.query.page   The page number
   * @param {string} req.query.limit  Limit of documents per page
   * @returns the list of follow
   */
  list: async function (req, res) {
    try {
      const page = req.query.page || 1;
      const limit = Number(req.query.limit) || 5;

      const { listFollow, totalFollow, totalPage } = await followRepo.list(
        page,
        limit
      );

      const response = {
        totalPage: totalPage,
        perPage: limit,
        totalFollow: totalFollow,
        listFollow: listFollow,
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
};
