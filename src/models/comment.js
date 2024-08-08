"use strict";

const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
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
    postId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "posts",
      required: true,
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

module.exports = mongoose.model("comment", commentSchema);
