"use strict";

const mongoose = require("mongoose");

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
