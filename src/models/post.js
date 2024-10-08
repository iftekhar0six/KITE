"use strict";

const mongoose = require("mongoose");
const { status } = require("../helpers/enum");

/**
 * Schema for Post Model
 */
const postSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "categories",
      required: true,
    },
    subCategoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "subCategories",
      required: true,
    },
    views: {
      type: Number,
      default: 0,
    },
    status: {
      type: Number,
      enum: [status.Active, status.Inactive],
      default: status.Active,
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

module.exports = mongoose.model("post", postSchema);
