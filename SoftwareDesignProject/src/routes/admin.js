const express = require('express')

const router = express.Router();

const adminController = require('../app/controllers/admin/adminController');
const listordersController = require('../app/controllers/admin/listorders.controller');
const orderdetailsController = require('../app/controllers/admin/orderdetails.controller');
const accountDetail = require('../app/controllers/admin/accountdetails.controller');
const chartController = require('../app/controllers/admin/chart.controller');
const banDetail = require('../app/controllers/admin/ban_unban');
const productController = require('../app/controllers/admin/product.controller');
const authorsController = require('../app/controllers/admin/authors.controller');
const categoriesController = require('../app/controllers/admin/categories.controller');
const publishersController = require('../app/controllers/admin/publishers.controller');
const categorydetailsController = require('../app/controllers/admin/categorydetails.controller');

router.use('/chart', chartController);
router.use('/home', adminController.home);
router.use('/table', adminController.table);
router.use('/table_account', adminController.table_account)
router.use('/table_product', adminController.table_product)
router.use('/banned', adminController.banned)
router.post('/update', adminController.edit)
router.use('/update', adminController.update);
router.post('/login', adminController.checkLogin)
router.use('/login', adminController.login);
router.use('/logout', adminController.logout);
router.use('/listorders', listordersController);
router.use('/orderdetails', orderdetailsController);
router.use('/accountdetail', accountDetail);
router.use('/bandetail', banDetail);
router.use('/product', productController);
router.use('/table_authors', authorsController);
router.use('/table_categories', categoriesController);
router.use('/table_publishers', publishersController);
router.use('/category_details', categorydetailsController);

module.exports = router;

