"use strict";

const messageRepo = require("../dataService/message");
const service = require("../helpers/service");
const { HttpStatus } = require("../utils/httpStatus");
const { Msg } = require("../utils/messageCode");

module.exports = {
  /**
   * function to create message
   *
   * @param {string} req.body.content  Content of the message
   * @param {string} req.body.senderId  Sender of the message
   * @param {string} req.body.receiverId  Receiver of the message
   * @returns the created message
   */
  create: async function (req, res) {
    try {
      if (service.hasValidatorErrors(req, res)) {
        return;
      }
      const details = {
        content: req.body.content,
        senderId: req.user.id,
        receiverId: req.body.receiverId,
      };

      const newMessage = await messageRepo.create(details);
      return res.send(
        service.prepareResponse(HttpStatus.SUCCESS, Msg.MESSAGE_CREATED, {
          id: newMessage.id,
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
   * function to delete message
   *
   * @param {string} req.params.id - The message id.
   * @returns {object} the details of deleted message
   */
  deleteMessage: async function (req, res) {
    try {
      if (service.hasValidatorErrors(req, res)) {
        return;
      }
      const messageId = req.params.id;

      const isMessage = await messageRepo.getDetail({ _id: messageId });
      if (!isMessage) {
        return res.send(
          service.prepareResponse(HttpStatus.NOT_FOUND, Msg.MESSAGE_NOT_FOUND)
        );
      }
      const deleteMessage = await messageRepo.deleteMessage(messageId);
      return res.send(
        service.prepareResponse(HttpStatus.SUCCESS, Msg.MESSAGE_DELETED, {
          id: deleteMessage.id,
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
