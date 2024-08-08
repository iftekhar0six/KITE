"use strict";

const express = require("express");
const fileUpload = require("express-fileupload");
const swaggerUi = require("swagger-ui-express");
const { swaggerSpec } = require("./helpers/swaggerConnection");
const http = require("http");
require("dotenv").config();

const PORT = process.env.PORT;
const HOST = process.env.HOST;
const app = express();
app.use(express.json());
app.use(fileUpload());

/**
 * Swagger
 */
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

/**
 * User router
 */
const userRouter = require("./routes/users/userRoutes");
const categoryUserRouter = require("./routes/users/categoryRoutes");
const subCategoryUserRouter = require("./routes/users/subCategoryRoutes");
const postUserRouter = require("./routes/users/postRoutes");
const commentUserRouter = require("./routes/users/commentRoutes");
const messageUserRouter = require("./routes/users/messageRoutes");
const followUserRouter = require("./routes/users/followRoutes");

/**
 * Admin router
 */
const adminRouter = require("./routes/admins/adminRoutes");
const categoryAdminRouter = require("./routes/admins/categoryRoutes");
const subCategoryAdminRouter = require("./routes/admins/subCategoryRoutes");
const postAdminsRouter = require("./routes/admins/postRoutes");
const commentAdminsRouter = require("./routes/admins/commentRoutes");
const messageAdminsRouter = require("./routes/admins/messageRoutes");
const followAdminsRouter = require("./routes/admins/followRoutes");

/**
 * database connection
 */
const { dbConnect } = require("./database/db");
global.dbConnection = dbConnect();

/**
 * Express application for handling User API routes.
 */
app.use("/api/users", userRouter);
app.use("/api/users/categories", categoryUserRouter);
app.use("/api/users/subCategories", subCategoryUserRouter);
app.use("/api/users/posts", postUserRouter);
app.use("/api/users/comments", commentUserRouter);
app.use("/api/users/messages", messageUserRouter);
app.use("/api/users/follows", followUserRouter);

/**
 * Express application for handling Admin API routes.
 */
app.use("/api/admins", adminRouter);
app.use("/api/admins/categories", categoryAdminRouter);
app.use("/api/admins/subCategories", subCategoryAdminRouter);
app.use("/api/admins/posts", postAdminsRouter);
app.use("/api/admins/comments", commentAdminsRouter);
app.use("/api/admins/messages", messageAdminsRouter);
app.use("/api/admins/follows", followAdminsRouter);

/**
 * HTTP server for the Express application.
 */
const server = http.createServer(app);

/**
 * Listens on the specified port.
 *
 * @param {number} PORT - The port number for the server.
 * @param {number} HOST - The host for the server.
 */
server.listen(PORT, HOST, () => {
  console.log(`Listening to port http://${HOST}:${PORT}`);
});
