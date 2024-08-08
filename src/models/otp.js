"use strict";

const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  otp: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("otp", postSchema);
