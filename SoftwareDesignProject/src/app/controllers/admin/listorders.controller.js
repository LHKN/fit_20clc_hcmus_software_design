const express = require("express");

const router = express.Router();
const orderService = require('../../../services/order.service');
const statusService = require('../../../services/status.service');
const userService = require('../../../services/user.service');


router.get('/', async (req, res, next) => {
    try {
        if(req.cookies.admin != null) {
            const order = await orderService.getAllOrderAscByDate();
            for (let i = 0; i < order.length; i++) {
                const user = await userService.findUserById(order[i].createdBy);
                const nameStatus = await statusService.getStatusName(order[i].status)
                order[i]["name"] = user.name;
                order[i]["statusName"] = nameStatus.name;
            }
            res.render('admin/listorders', { layout: 'admin-main', order, admin: req.cookies.admin });
        }
        else {
            res.redirect('/admin/login');
        }
        
    } catch (error) {
        console.log(error);
    }
});

module.exports = router;