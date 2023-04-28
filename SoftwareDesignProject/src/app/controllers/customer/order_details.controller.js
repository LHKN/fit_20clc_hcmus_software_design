const express = require("express");

const router = express.Router();
const bookService = require('../../../services/book.service');
const orderService = require("../../../services/order.service");
const orderItemListService = require("../../../services/order_item_lists.service");

router.get('/:idorder', async (req, res) => {
    try {
        const idorder = req.params.idorder;
        let user = req.cookies["user"];
        if (user == undefined) res.render('customer/error500', { layout: 'customer-main', orders: 0, cartQuantity: 0 })
        else {
            const orders = await orderService.getOrdersByUserId(user.id);
            const order = await orderService.getById(idorder);
            order["progress"] = (order.status - 1) * 50;
            const orderDetails = await orderItemListService.getById(idorder);
            var products = [];
            for (var i = 0; i < orderDetails.length; i++) {
                obj = orderDetails[i];
                book = await bookService.getBookById(obj.bookId);
                obj["tittle"] = book.title;
                obj["price"] = book.price;
                obj["imageUrl"] = book.imageUrl;
                products.push(obj);
            }
            res.render('customer/order_details', { order, products, user, orders });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
})

module.exports = router;