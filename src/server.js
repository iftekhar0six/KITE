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
 * Swagger UI setup
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
app.use("/api/v1", userRouter);
app.use("/api/v1/categories", categoryUserRouter);
app.use("/api/v1/categories/sub-categories", subCategoryUserRouter);
app.use("/api/v1/categories/sub-categories/posts", postUserRouter);
app.use("/api/v1/categories/sub-categories/posts/comments", commentUserRouter);
app.use("/api/v1/messages", messageUserRouter);
app.use("/api/v1/follows", followUserRouter);

/**
 * Express application for handling Admin API routes.
 */
app.use("/api/admin", adminRouter);
app.use("/api/admin/categories", categoryAdminRouter);
app.use("/api/admin/categories/sub-categories", subCategoryAdminRouter);
app.use("/api/admin/categories/sub-categories/posts", postAdminsRouter);
app.use(
  "/api/admin/categories/sub-categories/posts/comments",
  commentAdminsRouter
);
app.use("/api/admin/messages", messageAdminsRouter);
app.use("/api/admin/follows", followAdminsRouter);

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
