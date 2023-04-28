const express = require("express");

const router = express.Router();
const orderService = require('../../services/order.service');
const statusService = require('../../services/status.service');
const userService = require('../../services/user.service');


router.post('/', async (req, res, next) => {
    try {
        res.json(req.cookies)
        const {name, dob, phone, pass, pass1, pass2} = req.body;
        const object = req.cookies.admin;
        if(name != '')
        {
            object.name = name;
        }
        if(dob != '')
        {
            object.dob = dob;
        }
        if(phone != '')
        {
            object.phone = phone;
        }
        const new_pass = await bcrypt.hash(pass1, 10);
        if(pass != '' && pass1 != '' && pass2 != '')
        {
            if(pass1 == pass2) {
                bcrypt.compare(pass, object.password)
                .then((result) => {
                    if(result == true){                        
                        object.password = new_pass;

                        userService.updateUserById(object.id, object);

                        res.clearCookie('admin');
                        res.cookie('admin', object);

                        res.redirect('/admin/update')
                    }
                    else
                        res.render('admin/update', {message: 'Wrong password. Can not update password!', layout: 'admin-main'})
                })
                .catch((err) => {
                    res.render('admin/update', {message: 'Wrong password (err). Can not update password!', layout: 'admin-main'})
                });
            }
            else {
                res.render('admin/update', {message: 'Enter password again is wrong!!!', layout: 'admin-main'})
            }
        }
        else {
            userService.updateUserById(object.id, object);
            res.clearCookie('admin');
            res.cookie('admin', object);
            res.redirect('/admin/update')
        }
        
    } catch (error) {
        console.log(error);
    }
});

module.exports = router;