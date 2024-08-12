/**
 * @swagger
 * /admin/signup:
 *   post:
 *     summary: admin registration
 *     tags: [Admins/Admin]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               fName:
 *                 type: string
 *                 example: Tom
 *               lName:
 *                 type: string
 *                 example: Robert
 *               email:
 *                 type: string
 *                 example: admin@tom.com
 *               mobile:
 *                 type: string
 *                 example: 9425611586
 *               gender:
 *                 type: string
 *                 example: male
 *               password:
 *                 type: string
 *                 example: abc123
 *               image:
 *                 type: string
 *                 format: binary
 *               bio:
 *                 type: string
 *                 example: This is bio
 *               location:
 *                 type: string
 *                 example: California
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
 *                   example: Success
 *                 responseData:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: 66b0c8f5cb3f10683d8688ff
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
 *
 */

/**
 * @swagger
 * /admin/login:
 *   post:
 *     summary: admin login
 *     tags: [Admins/Admin]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: admin@tom.com
 *               password:
 *                 type: string
 *                 example: abc123
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
 *                   example: Success
 *                 responseData:
 *                   type: string
 *                   example: The access token of admin
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
 *
 */

/**
 * @swagger
 * /admin/detail:
 *   get:
 *     summary: admin profile
 *     tags: [Admins/Admin]
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
 *                   example: Success
 *                 responseData:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: 66acb05e066a0832ccee4a4a
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
 * /admin/list:
 *   get:
 *     summary: list of users
 *     tags: [Admins/Admin]
 *     parameters:
 *       - in: query
 *         name: searchTerm
 *         schema:
 *           type: string
 *         description: Search term for filtering admins
 *         example: john.doe@example.com
 *       - in: query
 *         name: perPage
 *         schema:
 *           type: integer
 *         description: Number of admins to return per page
 *         example: 2
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number to retrieve
 *         example: 1
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
 *                   example: Success
 *                 responseData:
 *                   type: object
 *                   properties:
 *                     totalUsers:
 *                       type: integer
 *                       example: 100
 *                     totalPages:
 *                       type: integer
 *                       example: 10
 *                     searchTerm:
 *                       type: string
 *                       example: tom@gmail.com
 *                     perPage:
 *                       type: integer
 *                       example: 2
 *                     listUser:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           _id:
 *                             type: string
 *                             example: 66b0c8f5cb3f10683d8688ff
 *                           type:
 *                             type: integer
 *                             example: 2
 *                           fName:
 *                             type: string
 *                             example: Tom
 *                           lName:
 *                             type: string
 *                             example: Robert
 *                           email:
 *                             type: string
 *                             example: tom@gmail.com
 *                           mobile:
 *                             type: integer
 *                             example: 1234567890
 *                           gender:
 *                             type: string
 *                             example: male
 *                           password:
 *                             type: string
 *                             example: Hashed password
 *                           image:
 *                             type: string
 *                             example: Path for image
 *                           bio:
 *                             type: string
 *                             example: This is bio
 *                           location:
 *                             type: string
 *                             example: California
 *                           status:
 *                             type: integer
 *                             example: 1
 *                           isDeleted:
 *                             type: boolean
 *                             example: false
 *                           updatedAt:
 *                             type: integer
 *                             example: 1722861813595
 *                           createdAt:
 *                             type: integer
 *                             example: 1722861813595
 *                           __v:
 *                             type: integer
 *                             example: 0
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
 * /admin/update:
 *   put:
 *     summary: update admin profile
 *     tags: [Admins/Admin]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               fName:
 *                 type: string
 *                 example: Tom
 *               lName:
 *                 type: string
 *                 example: Robert
 *               email:
 *                 type: string
 *                 example: tom@gmail.com
 *               mobile:
 *                 type: integer
 *                 example: 1234567890
 *               gender:
 *                 type: string
 *                 example: male
 *               password:
 *                 type: string
 *                 example: Password
 *               image:
 *                 type: string
 *                 format: binary
 *               bio:
 *                 type: string
 *                 example: This is bio
 *               location:
 *                 type: string
 *                 example: New street, California
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
 *                   example: Profile updated
 *                 responseData:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: 66b0c8f5cb3f10683d8688ff
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
 * /admin/delete:
 *   delete:
 *     summary: deactivate admin profile
 *     tags: [Admins/Admin]
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
 *                   example: User deleted
 *                 responseData:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: 66acb05e066a0832ccee4a4a
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
 * /admin/update-password:
 *   put:
 *     summary: update password (while logged in)
 *     tags: [Admins/Admin]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               password:
 *                 type: string
 *                 example: the_new_password
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
 *                   example: Password updated
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
 * /admin/forget-password:
 *   post:
 *     summary: forget password (send otp to registered email)
 *     tags: [Admins/Admin]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: Admin email for password reset
 *                 example: tom@gmail.com
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
 *                   example: Otp send successfully
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
 * /admin/reset-password:
 *   put:
 *     summary: reset password (reset new password for account via otp)
 *     tags: [Admins/Admin]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               otp:
 *                 type: string
 *                 example: the0tp
 *               password:
 *                 type: string
 *                 example: the new password
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
 *                   example: Password updated
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
