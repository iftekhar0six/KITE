/**
 * @swagger
 * /admins/categories/create:
 *   post:
 *     summary: Admin Create Category
 *     tags: [Admins/Category]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: movie
 *               description:
 *                 type: string
 *                 example: This category contains movie
 *               userId:
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
 *                   example: Category created successfully
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
 * /admins/categories/find/{id}:
 *   get:
 *     summary: Retrieve Category
 *     tags: [Admins/Category]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: MongoID of the category to retrieve
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
 * /admins/categories/list:
 *   get:
 *     summary: List Category
 *     tags: [Admins/Category]
 *     parameters:
 *       - in: query
 *         name: searchTerm
 *         schema:
 *           type: string
 *         description: searchTerm for filtering category
 *         example: technology
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Number of categories to return per page
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
 *                     totalCategory:
 *                       type: integer
 *                       example: 100
 *                     searchTerm:
 *                       type: integer
 *                       example: 100
 *                     listCategory:
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
 * /admins/categories/update/{id}:
 *   put:
 *     summary: Update Category
 *     tags: [Admins/Category]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: MongoID of the category to update
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
 *               name:
 *                 type: string
 *                 example: Science
 *               description:
 *                 type: string
 *                 example: Science category Description
 *               userId:
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
 *                   example: Success
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
 * /admins/categories/delete/{id}:
 *   delete:
 *     summary: Delete Category
 *     tags: [Admins/Category]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: MongoID of the category to delete
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
 *                   example: Category deleted successfully
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
