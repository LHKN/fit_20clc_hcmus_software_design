const express = require("express");
const cartService = require("../../../services/cart.service");

const router = express.Router();
const orderService = require('../../../services/order.service');

router.get('/', async (req, res, next) => {
    let user = req.cookies["user"];
    if (!user) return res.render('customer/error401', { layout: 'customer-main' });
    const cartQuantity = user ? await cartService.getCartQuantity(user.id) : 0;
    try {
        var orderList = []
        const pendingOrder = await orderService.getPendingOrder(user.id);
        for (var i = 0; i < pendingOrder.length; i++) {
            const obj = pendingOrder[i];
            obj["progress"] = 0;
            orderList.push(obj);
        }
        const shippingOrder = await orderService.getShippingOrder(user.id);
        for (var i = 0; i < shippingOrder.length; i++) {
            const obj = shippingOrder[i];
            obj["progress"] = 50;
            orderList.push(obj);
        }
        const doneOrder = await orderService.getDoneOrder(user.id);
        for (var i = 0; i < doneOrder.length; i++) {
            const obj = doneOrder[i];
            obj["progress"] = 100;
            orderList.push(obj);
        }

        res.render('customer/orderstatus', { orderList, user, cartQuantity, orders: orderList });

    } catch (error) {
        console.log(error);
        res.render('/customer/error500', {cartQuantity});
    }
});

module.exports = router;