/**
 * @swagger
 * /admins/follows/follow:
 *   post:
 *     summary: Admin Follow
 *     tags: [Admins/Follow]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               followingId:
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
 *                   example: Follow
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
 * /admins/follows/list:
 *   get:
 *     summary: List Comment
 *     tags: [Admins/Follow]
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Number of Comment to return per page
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
 *                     totalFollow:
 *                       type: integer
 *                       example: 100
 *                     listFollow:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           _id:
 *                             type: string
 *                             example: 66b1dca2c36ae9989d92810c
 *                           followerDetail:
 *                             type: object
 *                             properties:
 *                               id:
 *                                 type: string
 *                                 example: 66b1dca2c36ae9989d92810c
 *                               email:
 *                                 type: string
 *                                 example: tom@gmail.com
 *                           followingDetail:
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
