const express = require('express');
const router = express.Router();
const authorService = require('../../../services/author.service');
const bookService = require('../../../services/book.service');
const _ = require('lodash');

router.get('/', async (req, res) => {
    try {
        if (req.cookies.admin != null) {
            const { success } = req.query;
            const authors = await authorService.getAllAuthor();
            const message = _.isEmpty(success) ? null : {
                content: success === 'true' ? 'Author deleted' : 'Deleted failed',
                alert: success === 'true' ? 'success' : 'danger'
              }
            res.render('admin/table_authors', { layout: 'admin-main', authors, admin: req.cookies.admin , message});
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
    try {
        const result = await authorService.createAuthor(data.author);
        return res.redirect('/admin/table_authors');
    } catch (error) {
        console.log(error);
        return res.render('admin/error500', { layout: 'admin-main' });
    }
})

router.post('/update', async (req, res) => {
    const data = req.body;
    try {
        const result = await authorService.updateAuthor(data.name, data.id);
        console.log(result);
        return res.redirect('/admin/table_authors');
    } catch (error) {
        console.log(error);
        return res.render('admin/error500', { layout: 'admin-main' });
    }
})

router.post('/delete', async (req, res) => {
    const data = req.body;
    try {
        console.log(data);
        const books = await bookService.deleteBookByAuthor(data.id);
        const result = await authorService.deleteAuthor(data.id);
        return res.redirect('/admin/table_authors?success=true');
    } catch (error) {
        console.log(error);
        return res.render('admin/error500', { layout: 'admin-main' });
    }
})

module.exports = router;