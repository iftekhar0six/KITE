/**
 * @swagger
 * /admin/categories/sub-categories/create:
 *   post:
 *     summary: create sub-category by admin
 *     tags: [Admins/Sub-Category]
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
 *               content:
 *                 type: string
 *                 example: This category contains movie
 *               categoryId:
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
 *                   example: subCategory created successfully
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
 * /admin/categories/sub-categories/detail/{id}:
 *   get:
 *     summary: retrieve sub-category (by id)
 *     tags: [Admins/Sub-Category]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: MongoID of the subCategory to retrieve
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
 * /admin/categories/sub-categories/list:
 *   get:
 *     summary: list sub-category
 *     tags: [Admins/Sub-Category]
 *     parameters:
 *       - in: query
 *         name: searchTerm
 *         schema:
 *           type: string
 *         description: searchTerm for filtering subCategory
 *         example: technology
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Number of subCategory to return per page
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
 *                     totalSubCategory:
 *                       type: integer
 *                       example: 100
 *                     searchTerm:
 *                       type: integer
 *                       example: 100
 *                     listSubCategory:
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
 *                                 example: technology
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
 * /admin/categories/sub-categories/update/{id}:
 *   put:
 *     summary: update sub-category (by id)
 *     tags: [Admins/Sub-Category]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: MongoID of the subCategory to update
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
 *               content:
 *                 type: string
 *                 example: Science subCategory Description
 *               categoryId:
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
 * /admin/categories/sub-categories/delete/{id}:
 *   delete:
 *     summary: delete sub-category (by id)
 *     tags: [Admins/Sub-Category]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: MongoID of the subCategory to delete
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
 *                   example: subCategory deleted successfully
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
