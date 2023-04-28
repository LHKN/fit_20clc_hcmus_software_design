const express = require('express');
const userService = require('../../../services/user.service')
const app = express()
const router = express.Router();

router.get('/:idorder', async (req, res) => {
    try {
        if(req.cookies.admin != null) {
            const idorder = req.params.idorder;
            const user = await userService.findUserById(idorder);
            
            if(user.isBanned == true)
                user.isBanned = false;
            else{
                if(req.cookies.admin.email != user.email)
                    user.isBanned = true;
            }
                

            userService.updateUserById(idorder, user);

            res.redirect('/admin/banned');
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
