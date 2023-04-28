const express = require('express');
const userService = require('../../../services/user.service')
const bookService = require('../../../services/book.service')
const bcrypt = require('bcryptjs');
const categoryService = require('../../../services/category.service');
const publisherService = require('../../../services/publisher.service');
const authorService = require('../../../services/author.service');
const app = express()

class adminController {
    chart(req, res) {
        if (req.cookies.admin != null)
            res.render('admin/chart', { layout: 'admin-main', admin: req.cookies.admin });
        else
            res.redirect('/admin/login');
    }
    async home(req, res) {
        if (req.cookies.admin != null) {
            const order = await bookService.getAllBooks()
            res.render('admin/home', {
                layout: 'admin-main',
                admin: req.cookies.admin,
                order
            });
        }
        else
            res.redirect('/admin/login');

    }
    update(req, res) {
        if (req.cookies.admin != null)
            res.render('admin/update', { layout: 'admin-main', admin: req.cookies.admin });
        else
            res.redirect('/admin/login');
    }
    async edit(req, res) {
        const { name, dob, phone, pass, pass1, pass2 } = req.body;
        const object = req.cookies.admin;
        if (name != '') {
            object.name = name;
        }
        if (dob != '') {
            object.dob = dob;
        }
        if (phone != '') {
            object.phone = phone;
        }
        const new_pass = await bcrypt.hash(pass1, 10);
        if (pass != '' && pass1 != '' && pass2 != '') {
            if (pass1 == pass2) {
                bcrypt.compare(pass, object.password)
                    .then((result) => {
                        if (result == true) {
                            object.password = new_pass;

                            userService.updateUserById(object.id, object);

                            res.clearCookie('admin');
                            res.cookie('admin', object);

                            res.redirect('/admin/update')
                        }
                        else
                            res.render('admin/update', { message: 'Wrong password. Can not update password!', layout: 'admin-main' })
                    })
                    .catch((err) => {
                        res.render('admin/update', { message: 'Wrong password (err). Can not update password!', layout: 'admin-main' })
                    });
            }
            else {
                res.render('admin/update', { message: 'Enter password again is wrong!!!', layout: 'admin-main' })
            }
        }
        else {
            userService.updateUserById(object.id, object);
            res.clearCookie('admin');
            res.cookie('admin', object);
            res.redirect('/admin/update')
        }
    }
    table(req, res) {
        if (req.cookies.admin != null)
            res.render('admin/table', { layout: 'admin-main', admin: req.cookies.admin });
        else
            res.redirect('/admin/login');
    }
    async table_account(req, res) {
        if (req.cookies.admin != null) {
            const account = await userService.getAllUsers();
            res.render('admin/table_account', {
                layout: 'admin-main',
                admin: req.cookies.admin,
                order: account
            });
        }
        else
            res.redirect('/admin/login');
    }
    async table_product(req, res) {

        if (req.cookies.admin != null) {
            const books = await bookService.getAllBooks();
            const categories = await categoryService.getAllCategories();
            const publishers = await publisherService.getAllPublisher();
            const authors = await authorService.getAllAuthor();
            res.render('admin/table_product', {
                layout: 'admin-main',
                admin: req.cookies.admin,
                books,
                categories,
                authors,
                publishers
            });
        }
        else
            res.redirect('/admin/login');
    }

    async banned(req, res) {
        //res.json(req.cookies.admin)
        if (req.cookies.admin == null)
            res.redirect('/admin/home')
        else {
            const account = await userService.getAllUsers();
            res.render('admin/banned_table', {
                layout: 'admin-main',
                admin: req.cookies.admin,
                order: account
            });
        }
    }
    login(req, res) {
        if (req.cookies.admin != null)
            res.redirect('/admin/home')
        else
            res.render('admin/login', { layout: 'admin-main', admin: req.cookies.admin });
    }
    logout(req, res) {
        res.clearCookie('admin');
        res.redirect('/admin/login');
    }
    async checkLogin(req, res) {
        const { email, password } = req.body;
        const check = await userService.checkIfExists(email);
        if (check) {
            const admin = await userService.findUser(email, password)
            if (admin != null) {
                if (admin.isAdmin == true) {
                    if (admin.isBanned == false) {
                        res.cookie('admin', admin, {
                            onlyHttp: true,
                            maxAge: 6000000,
                        });

                        res.redirect('/admin/home')
                    }
                    else {
                        res.render('admin/login', { message: 'You are Banned!', layout: 'admin-main' });
                    }
                }
                else {
                    res.render('admin/login', { message: 'You are not Admin!', layout: 'admin-main' });
                }
            }
            else {
                res.render('admin/login', { message: 'Wrong email or password!', layout: 'admin-main' });
            }
        }
        else {
            res.render('admin/login', { message: 'Wrong email or password!', layout: 'admin-main' })
        }
    }
}

module.exports = new adminController;
