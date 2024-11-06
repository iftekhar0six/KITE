"use strict";

const mongoose = require("mongoose");
const { type, status } = require("../helpers/enum");

/**
 * Schema for User Model
 */
const userSchema = new mongoose.Schema(
  {
    type: {
      type: Number,
      enum: [type.Admin, type.User],
      required: true,
    },
    fName: {
      type: String,
      required: true,
    },
    lName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    mobile: {
      type: Number,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    bio: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    status: {
      type: Number,
      enum: [status.Active, status.Inactive],
      default: status.Active,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    updatedAt: {
      type: Number,
      default: Date.now,
    },
    createdAt: {
      type: Number,
      default: Date.now,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("user", userSchema);
