"use strict";
const { Schema, mongoose } = require("mongoose");
const { status, Type } = require("../helpers/enum");
const passportLocalMongoose = require("passport-local-mongoose");

const adminSchema = new Schema({
    name: {
        type: String,
        required: false,
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    phone: {
        type: String,
        required: false,
    },
    password: {
        type: String,
        required: true,
    },
    isDeleted: {
        type: Boolean,
        default: false,
    },
    status: {
        type: Number,
        required: true,
        enum: [status.Active, status.Inactive],
        default: status.Active,
    },
    createdAt: Number,
    updatedAt: Number,
}, {
    timestamps: true,
});

adminSchema.plugin(passportLocalMongoose, { usernameField: 'email', hashField: 'password' })
// const Admin = new mongoose.model("admin", adminSchema)

module.exports = new mongoose.model("admin", adminSchema)
