"use strict";

const mongoose = require("mongoose");
require("dotenv").config();

const uri = process.env.uri;

/**
 * @returns connection to database
 */
async function dbConnect() {
  try {
    await mongoose.connect(uri);
    console.log("Database connected...");
  } catch (error) {
    console.error("Error connecting database: ", error);
  }
}

module.exports = { dbConnect };
