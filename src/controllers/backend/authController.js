"use strict";

const passport = require("passport");
const AdminModel = require("../../models/admin");
const { toastrHandler } = require("../../helpers/service");

const messageToStr = (errorMessage) => {
  return `${errorMessage}`;
};

module.exports = {
  signupForm: async function (req, res, next) {
    try {
      res.render("./auth/register", { title: "Register" });
    } catch (error) {
      next(error);
    }
  },
  signup: async function (req, res, next) {
    try {
      const { email, password } = req.body;

      const newAdmin = new AdminModel({ email });
      await newAdmin.setPassword(password);
      await newAdmin.save();

      passport.authenticate("local")(req, res, () => {
        res.redirect("/auth/login");
      });
    } catch (error) {
      next(error);
    }
  },
  loginForm: async function (req, res, next) {
    try {
      const result = toastrHandler(req);
      if (result == false) {
        res.render("./auth/login", { title: "Login", req: null, res: res });
      } else {
        res.render("./auth/login", { title: "Login", req: req, res: res });
      }
    } catch (error) {
      next(error);
    }
  },
  login: async function (req, res, next) {
    try {
      const newUser = new AdminModel({
        email: req.body.email,
        password: req.body.password,
      });
      req.login(newUser, (err) => {
        if (err) {
          console.log(err);
        } else {
          passport.authenticate("local", function (err, user, info, status) {
            if (err) {
              return next(err);
            }
            if (!info) {
              res.cookie("msg", { success: "Logged-in successfully!" }, { httpOnly: true });
              res.redirect("/admin/home");
            } else {
              res.cookie("msg", { error: messageToStr(info.message) }, { httpOnly: true });
              res.redirect("/admin");
            }
          })(req, res, next);
        }
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  },
};
