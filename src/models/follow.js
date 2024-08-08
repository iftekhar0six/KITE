"use strict";

const mongoose = require("mongoose");

const followSchema = new mongoose.Schema(
  {
    followingId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    followerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("follow", followSchema);
