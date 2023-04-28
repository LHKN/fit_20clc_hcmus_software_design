const express = require('express');
const router = express.Router();
const categoryService = require('../../../services/category.service');
const _ = require('lodash');
const fileService = require('../../../services/file.service');
const path = require('path');
const appRoot = require('app-root-path');
const bookService = require('../../../services/book.service');

router.get('/:id', async (req, res) => {
    const categoryId = req.params.id;
    const { success } = req.query;
    try {
        if (req.cookies.admin != null) {
            console.log(req.query);
            let category = await categoryService.getCategoryById(categoryId);
            const message = _.isEmpty(success) ? null : {
                content: success === 'true' ? 'Category updated' : 'Update failed',
                alert: success === 'true' ? 'success' : 'danger'
            }
            res.render('admin/category_details', { layout: 'admin-main', category, admin: req.cookies.admin, message });

        }
        else {
            res.redirect('/admin/login');
        }

    } catch (error) {
        console.log(error);
    }
})

router.post('/edit', async (req, res) => {
    try {
        const { id, ...category } = req.body;
        console.log(req.body.title);
        const result = await categoryService.updateCategoryById(id, req.body.title);
        if (!result) return res.redirect(`/admin/category_details/${id}?success=false`);
        return res.redirect(`/admin/category_details/${id}?success=true`);
    } catch (error) {
        console.log(error);
        return res.render('admin/error500', { layout: 'admin-main' });
    }
});

router.post('/update_image/:catId', async (req, res) => {
    const catId = Number(req.params.catId);
    try {
        const uploadDir = path.join(appRoot.toString(), 'src/public/customers/img/themes/images/genres');
        console.log(uploadDir);
        const options = {
            uploadDir: uploadDir,
            multiples: true,
            maxFileSize: 100 * 1024 * 1024,
            keepExtensions: true,
            filter: function ({ name, originalFilename, mimetype }) {
                return mimetype && mimetype.includes('image');
            }
        }
        const files = await fileService.saveFile(req, options);

        const data = {
            imageUrl: _.isEmpty(files) ? null : '/customers/img/themes/images/genres/' + files.newFilename
        };
        const result = await categoryService.updateCatImgById(catId, data.imageUrl);
        return res.redirect(`/admin/category_details/${catId}?success=true`);
    } catch (error) {
        console.log(error);
        return res.redirect(`/admin/category_details/${catId}?success=true`);
    }
});

router.post('/delete', async (req, res) => {
    const { id } = req.body;
    console.log(id);
    try {
        const books = await bookService.deleteBookByCategory(id);
        const result = await categoryService.deleteCategory(id);
        return res.redirect('/admin/table_categories?success=true');
    } catch (error) {
        console.log(error);
        return res.render('admin/error500', { layout: 'admin-main' });
    }
})

module.exports = router;