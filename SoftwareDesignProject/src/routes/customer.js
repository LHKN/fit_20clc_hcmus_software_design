const express = require('express')

const router = express.Router();

const homeController = require('../app/controllers/customer/home.controller');
const productsController = require('../app/controllers/customer/products.controller');
const productDetailController = require('../app/controllers/customer/product_detail.controller');
const userController = require('../app/controllers/customer/user.controller');
const loginController = require('../app/controllers/customer/login.controller')
const registerController = require('../app/controllers/customer/register.controller');
const cartController = require('../app/controllers/customer/cart.controller');
const checkoutController = require('../app/controllers/customer/checkout.controller');
const orderstatusController = require('../app/controllers/customer/orderstatus.controller');
const orderdetailsController = require('../app/controllers/customer/order_details.controller');
const reviewController = require('../app/controllers/customer/review.controller');
const logoutController = require('../app/controllers/customer/logout.controller');

router.use('/cart', cartController)
router.use('/home', homeController);
router.use('/login', loginController);
router.use('/logout', logoutController);
router.use('/register', registerController);
router.use('/product_details', productDetailController);
router.use('/products', productsController);
router.use('/user', userController);
router.use('/checkout', checkoutController);
router.use('/orderstatus', orderstatusController);
router.use('/order_details', orderdetailsController);
router.use('/review', reviewController);

module.exports = router;
