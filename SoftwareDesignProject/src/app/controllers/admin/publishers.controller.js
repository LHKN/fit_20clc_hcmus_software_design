const express = require('express');
const router = express.Router();
const publisherService = require('../../../services/publisher.service');
const bookService = require('../../../services/book.service');
const _ = require('lodash');

router.get('/', async (req, res)=>{
    try {
        if(req.cookies.admin != null) {
            const { success } = req.query;
            const publishers = await publisherService.getAllPublisher();
            const message = _.isEmpty(success) ? null : {
                content: success === 'true' ? 'Publisher deleted' : 'Deleted failed',
                alert: success === 'true' ? 'success' : 'danger'
              }
            res.render('admin/table_publishers', { layout: 'admin-main', publishers, admin: req.cookies.admin, message });
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
        const result = await publisherService.createNewPublisher(data.publisher);
        return res.redirect('/admin/table_publishers');
    } catch (error) {
        console.log(error);
        return res.render('admin/error500', { layout: 'admin-main' });
    }
})

router.post('/update', async (req, res) => {
    const data = req.body;
    try {
        console.log(data);
        const result = await publisherService.UpdatePublisher(data.name, data.id);
        return res.redirect('/admin/table_publishers');
    } catch (error) {
        console.log(error);
        return res.render('admin/error500', { layout: 'admin-main' });
    }
})

router.post('/delete', async (req, res) => {
    const data = req.body;
    try {
        const books = await bookService.deleteBookByPublisher(data.id);
        const result = await publisherService.deletePublisher(data.id);
        return res.redirect('/admin/table_authors?success=true');
    } catch (error) {
        console.log(error);
        return res.render('admin/error500', { layout: 'admin-main' });
    }
})

module.exports = router;