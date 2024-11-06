"use strict";

const mongoose = require("mongoose");
const { status } = require("../helpers/enum");

/**
 * Schema for Category Model
 */
const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
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

module.exports = mongoose.model("category", categorySchema);
