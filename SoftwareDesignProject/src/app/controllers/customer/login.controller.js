const express = require("express");
const router = express.Router();
const userService = require('../../../services/user.service');
const bcrypt = require('bcryptjs')
const { uuid } = require('uuidv4');
const qs = require('qs');
const { render } = require("node-sass");
const Model = require('../../../models/user.model');
const { application } = require("express");
const categoryService = require("../../../services/category.service");
const _ = require('lodash');


router.get('/', async (req, res) => {
    try {
        const categories = await categoryService.getAllCategories();
        if(req.cookies.user == null)
            res.render('customer/login', { categories });
        else
            res.redirect('/');
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
});

router.post('/find', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await userService.findUser(email, password);
        if (!_.isEmpty(user)) {
            res.cookie('user', user, {
                httpOnly: true,
                maxAge: 6000000,
            });
            res.redirect('/');
        }
    } catch (error) {
        console.log(error);
        const categories = await categoryService.getAllCategories();
        res.render('customer/login', { categories, message: error })
    }
});

module.exports = router;
