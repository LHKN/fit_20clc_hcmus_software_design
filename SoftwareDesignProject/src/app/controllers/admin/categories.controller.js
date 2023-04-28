const express = require('express');
const router = express.Router();
const categoryService = require('../../../services/category.service');
const _ = require('lodash');
const bookService = require('../../../services/book.service');

router.get('/', async (req, res) => {
    try {
        if (req.cookies.admin != null) {
            const { success } = req.query;
            const categories = await categoryService.getAllCategories();
            const message = _.isEmpty(success) ? null : {
                content: success === 'true' ? 'Category deleted' : 'Deleted failed',
                alert: success === 'true' ? 'success' : 'danger'
              }
            res.render('admin/table_categories', { layout: 'admin-main', categories, admin: req.cookies.admin, message });
        }
        else {
            res.redirect('/admin/login');
        }

    } catch (error) {
        console.log(error);
    }
})

router.post('/create', async (req, res) => {
    const data = req.body;
    console.log(data);
    try {
        const result = await categoryService.createCategory(data.categories, data.url);
        return res.redirect('/admin/table_categories');
    } catch (error) {
        console.log(error);
        return res.render('admin/error500', { layout: 'admin-main' });
    }
})

module.exports = router;