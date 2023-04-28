const express = require("express");

const router = express.Router();
const bookService = require('../../../services/book.service');
const categoryService = require('../../../services/category.service');
var Paginator = require("paginator");
const cartService = require("../../../services/cart.service");
const helperService = require("../../../services/helper.service");
const limit = 6;
const userService = require('../../../services/user.service');
const orderService = require("../../../services/order.service");


router.get('/', async (req, res, next) => {
    const userId = req.cookies["user"]?.id;
    try {
        const categories = await categoryService.getAllCategories();
        //const books = await bookService.getAllBooks();

        const pageAsNum = req.query.page? Number(req.query.page) : 1;


        let page = 1
        if(!Number.isNaN(pageAsNum)&&pageAsNum>0){
            page = pageAsNum;
        }

        var paginator = new Paginator(limit, 2);
        const totalBooks = await bookService.getAllBooks();
        const countBooks = totalBooks.length;

        var pagination_info = paginator.build(countBooks, page);

        const books = await bookService.getBooksLimit(limit*(page-1), limit);

        const searchUrl = '/customer/products/search';
        
        const latestBooks = helperService.formatBooks(await bookService.getLatestBooks());

        const cartQuantity = userId ? await cartService.getCartQuantity(userId) : 0;

        const user = userId ? await userService.getUserById(userId) : null;

        const orders = userId ? await orderService.getOrdersByUserId(userId) : [];

        res.render('customer/home', { 
            books: books,
            latestBooks,
            categories, 
            searchUrl: searchUrl, 
            layout: 'customer-main', 
            user, 
            orders,
            cartQuantity,
            pagination_info,});
    } catch (error) {
        console.log(error);
    }
});

module.exports = router;