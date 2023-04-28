const express = require("express");
const router = express.Router();
const cartService = require('../../../services/cart.service');
const bookService = require('../../../services/book.service');
const orderService = require('../../../services/order.service');
const orderItemListService = require('../../../services/order_item_lists.service');
const helperService = require("../../../services/helper.service");

router.post('/', async (req, res) => {
    try {
        let user = req.cookies["user"];
        if (user == undefined) res.render('customer/401', { layout: 'customer-main' })
        else {
            const address = req.body.fname + ", " + req.body.ward + ", " + req.body.district + ", " + req.body.city;
            if (user != null) {
                const myCart = await cartService.getCart(user.id);
                listProductsJson = JSON.parse(myCart.products);
                let products = [];
                let subTotal = 0;
                for (var i = 0; i < listProductsJson.length; i++) {
                    var obj = listProductsJson[i];
                    for (var key in obj) {
                        if (key === "book_id") {
                            product = await bookService.getBookById(obj[key]);
                            products.push(product);
                        }
                        else {

                            products[i].quantity = obj[key];
                            products[i].total = parseInt(products[i].quantity) * parseInt(products[i].price);
                            subTotal += products[i].total;
                        }
                    }
                }
                products = helperService.formatProducts(products);
                res.render('customer/checkout', { user, products, subTotal, address });
            }
        }
    }
    catch (error) {
        console.log(error);
        res.render('customer/error401')
    }
})

router.post('/create_order', async (req, res) => {
    try {
        let user = req.cookies["user"];
        const yourCart = await cartService.getCart(user.id);
        listProductsJson = JSON.parse(yourCart.products);
        const newOrder = await orderService.createNewOrder(req.body.address, req.body.total.split('.').join(''), user.phone, user.id);
        for (var i = 0; i < listProductsJson.length; i++) {
            obj = listProductsJson[i];
            const newItemList = await orderItemListService.createNewOne(newOrder.id, obj.quantity, obj.book_id)
        }
        const deletedCart = cartService.deleteCart(user.id)
        res.redirect('/');
    }
    catch (error) {
        console.log(error);
        res.render('customer/error401')
    }
});

module.exports = router;
