/**
 * @swagger
 * /admins/posts/create:
 *   post:
 *     summary: Admin Create Post
 *     tags: [Admins/Post]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               content:
 *                 type: string
 *                 example: This category contains movie
 *               userId:
 *                 type: string
 *                 example: 66b0a7a86706e973eb375ea2
 *               categoryId:
 *                 type: string
 *                 example: 66b0a7a86706e973eb375ea2
 *               subCategoryId:
 *                 type: string
 *                 example: 66b0a7a86706e973eb375ea2
 *     responses:
 *       200:
 *         description: success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 responseCode:
 *                   type: integer
 *                   example: 200
 *                 responseMessage:
 *                   type: string
 *                   example: Post created successfully
 *                 responseData:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: 66b0a7a86706e973eb375ea2
 *       500:
 *         description: failed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 responseCode:
 *                   type: integer
 *                 responseMessage:
 *                   type: string
 *                   example: Error message
 */

/**
 * @swagger
 * /admins/posts/find/{id}:
 *   get:
 *     summary: Retrieve Post
 *     tags: [Admins/Post]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: MongoID of the Post to retrieve
 *         schema:
 *           type: string
 *           example: 66acb05e066a0832ccee4a4a
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 responseCode:
 *                   type: integer
 *                   example: 200
 *                 responseMessage:
 *                   type: string
 *                   example: Success
 *                 responseData:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: 66acb05e066a0832ccee4a4a
 *       500:
 *         description: Failed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 responseCode:
 *                   type: integer
 *                 responseMessage:
 *                   type: string
 *                   example: Error message
 */

/**
 * @swagger
 * /admins/posts/list:
 *   get:
 *     summary: List Post
 *     tags: [Admins/Post]
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Number of Post to return per page
 *         example: 2
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number to retrieve
 *         example: 1
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 responseCode:
 *                   type: integer
 *                   example: 200
 *                 responseMessage:
 *                   type: string
 *                   example: Success
 *                 responseData:
 *                   type: object
 *                   properties:
 *                     totalPage:
 *                       type: integer
 *                       example: 100
 *                     perPage:
 *                       type: integer
 *                       example: 100
 *                     totalPost:
 *                       type: integer
 *                       example: 100
 *                     listPost:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           _id:
 *                             type: string
 *                             example: 66b1dca2c36ae9989d92810c
 *                           userDetail:
 *                             type: object
 *                             properties:
 *                               id:
 *                                 type: string
 *                                 example: 66b1dca2c36ae9989d92810c
 *                               email:
 *                                 type: string
 *                                 example: tom@gmail.com
 *                           categoryDetail:
 *                             type: object
 *                             properties:
 *                               id:
 *                                 type: string
 *                                 example: 66b1dca2c36ae9989d92810c
 *                               name:
 *                                 type: string
 *                                 example: tiger
 *                           subCategoryDetail:
 *                             type: object
 *                             properties:
 *                               id:
 *                                 type: string
 *                                 example: 66b1dca2c36ae9989d92810c
 *                               name:
 *                                 type: string
 *                                 example: animal
 *       500:
 *         description: Failed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 responseCode:
 *                   type: integer
 *                 responseMessage:
 *                   type: string
 *                   example: Error message
 */

/**
 * @swagger
 * /admins/posts/update/{id}:
 *   put:
 *     summary: Update Post
 *     tags: [Admins/Post]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: MongoID of the Post to update
 *         schema:
 *           type: string
 *           example: 66acb05e066a0832ccee4a4a
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               content:
 *                 type: string
 *                 example: Science Post Description
 *               userId:
 *                 type: string
 *                 example: 66b1dca2c36ae9989d92810c
 *               categoryId:
 *                 type: string
 *                 example: 66b1dca2c36ae9989d92810c
 *               subCategoryId:
 *                 type: string
 *                 example: 66b1dca2c36ae9989d92810c
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 responseCode:
 *                   type: integer
 *                   example: 200
 *                 responseMessage:
 *                   type: string
 *                   example: Post updated successfully
 *                 responseData:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: 66b1dca2c36ae9989d92810c
 *       500:
 *         description: Failed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 responseCode:
 *                   type: integer
 *                 responseMessage:
 *                   type: string
 *                   example: Error message
 */

/**
 * @swagger
 * /admins/posts/delete/{id}:
 *   delete:
 *     summary: Delete Post
 *     tags: [Admins/Post]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: MongoID of the Post to delete
 *         schema:
 *           type: string
 *           example: 66acb05e066a0832ccee4a4a
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 responseCode:
 *                   type: integer
 *                   example: 200
 *                 responseMessage:
 *                   type: string
 *                   example: Post deleted successfully
 *                 responseData:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: 66b1dca2c36ae9989d92810c
 *       500:
 *         description: Failed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 responseCode:
 *                   type: integer
 *                 responseMessage:
 *                   type: string
 *                   example: Error message
 */
