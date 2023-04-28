const express = require("express");

const router = express.Router();
const orderService = require('../../../services/order.service');
const orderItemListService = require('../../../services/order_item_lists.service');
const bookService = require('../../../services/book.service');
const statusService = require('../../../services/status.service');

router.get('/:idorder', async (req, res) => {
    try {
        if(req.cookies.admin != null) {
            const idorder = req.params.idorder;
            const order = await orderService.getById(idorder);
            const orderDetails = await orderItemListService.getById(idorder);
            statusName = await statusService.getStatusName(order.status);
            order["statusName"] = statusName.name;
            console.log(order);
            var products = [];
            for (var i = 0; i < orderDetails.length; i++) {
                obj = orderDetails[i];
                book = await bookService.getBookById(obj.bookId);
                obj["tittle"] = book.title;
                obj["price"] = book.price;
                obj["imageUrl"] = book.imageUrl;
                products.push(obj);
            }
            res.render('admin/orderdetails', { order, products, layout: 'admin-main', admin: req.cookies.admin});
        }        
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
})

router.post('/mark-pending', async (req, res) => {
    try {
        if(req.cookies.admin != null) {
            console.log(req.body.id)
            const updateOrder = await orderService.updateOrder(req.body.id, 1);
            let message="";
            res.json({ msg: message })
        }        
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
})
router.post('/mark-shipping', async (req, res) => {
    try {
        if(req.cookies.admin != null) {
            let message = "";
            const updateOrder = await orderService.updateOrder(req.body.id, 2);
            res.json({ msg: message })
        }        
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
})
router.post('/mark-done', async (req, res) => {
    try {
        if(req.cookies.admin != null) {
            let message = "";
            const updateOrder = await orderService.updateOrder(req.body.id, 3);
            res.json({ msg: message })
        }        
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
})

module.exports = router;