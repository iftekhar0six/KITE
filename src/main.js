/** 
 * ROutes 
 */
const categoryRoutes = require('./routes/Api/v1/backend/categoryRoutes');
app.use('/admin', categoryRoutes);


/**
 * Router
 */
const express = require('express');
const router = express.Router();
const categoryController = require('../../../../controllers/Api/v1/backend/categoryController');

router.get('/category', categoryController.list);

module.exports = router;


/**
 * Controller
 */
const CategoryModel = require('../../../../models/category');

module.exports = {
    /**
     * List all categories
     */
    list: async function (req, res, next) {
        try {
            const categories = await CategoryModel.find().exec();
            return res.render('admin/category', { categories });
        } catch (error) {
            console.error('Error listing categories:', error);
            next(error);
        }
    }
}
