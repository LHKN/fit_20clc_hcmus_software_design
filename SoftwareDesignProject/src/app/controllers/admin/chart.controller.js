const curDate = new Date();
const curDate1 = new Date(new Date().setDate(new Date().getDate() - 1));
const curDate2 = new Date(new Date().setDate(new Date().getDate() - 2));
const curDate3 = new Date(new Date().setDate(new Date().getDate() - 3));
const curDate4 = new Date(new Date().setDate(new Date().getDate() - 4));
const curDate5 = new Date(new Date().setDate(new Date().getDate() - 5));
const curDate6 = new Date(new Date().setDate(new Date().getDate() - 6));

const express = require("express");
const { Sequelize } = require("sequelize");
const bookService = require("../../../services/book.service");
const router = express.Router();
const orderService = require('../../../services/order.service');
const orderItemListService = require("../../../services/order_item_lists.service");


const curMonth = new Date();
const curMonth1 = new Date(new Date().setMonth(new Date().getMonth() - 1));
const curMonth2 = new Date(new Date().setMonth(new Date().getMonth() - 2));
const curMonth3 = new Date(new Date().setMonth(new Date().getMonth() - 3));

router.get('/', async (req, res, next) => {
    const curRevenue = await orderService.getOrderByDay(curDate);
    const curRevenue1 = await orderService.getOrderByDay(curDate1);
    const curRevenue2 = await orderService.getOrderByDay(curDate2);
    const curRevenue3 = await orderService.getOrderByDay(curDate3);
    const curRevenue4 = await orderService.getOrderByDay(curDate4);
    const curRevenue5 = await orderService.getOrderByDay(curDate5);
    const curRevenue6 = await orderService.getOrderByDay(curDate6);
    let revenue = []
    let total = 0;
    let totalRevenue = 0;

    curRevenue.forEach(element => {
        total+= element.totalPrice ? Number(element.totalPrice): 0;
    });
    revenue["cur"] = total;
    totalRevenue+=total;
    total=0;

    curRevenue1.forEach(element => {
        total+= element.totalPrice ? Number(element.totalPrice): 0;
    });
    revenue["cur1"] = total;
    totalRevenue+=total;
    total=0;

    curRevenue2.forEach(element => {
        total+= element.totalPrice ? Number(element.totalPrice): 0;
    });
    revenue["cur2"] = total;
    totalRevenue+=total;
    total=0;

    curRevenue3.forEach(element => {
        total+= element.totalPrice ? Number(element.totalPrice): 0;
    });
    revenue["cur3"] = total;
    totalRevenue+=total;
    total=0;

    curRevenue4.forEach(element => {
        total+= element.totalPrice ? Number(element.totalPrice): 0;
    });
    revenue["cur4"] = total;
    totalRevenue+=total;
    total=0;

    curRevenue5.forEach(element => {
        total+= element.totalPrice ? Number(element.totalPrice): 0;
    });
    revenue["cur5"] = total;
    totalRevenue+=total;
    total=0;

    curRevenue6.forEach(element => {
        total+= element.totalPrice ? Number(element.totalPrice): 0;
    });
    revenue["cur6"] = total;
    totalRevenue+=total;

    const curRevenueMonth = await orderService.getOrderByMonth(curMonth.getMonth() + 1);
    const curRevenueMonth1 = await orderService.getOrderByMonth(curMonth1.getMonth() + 1);
    const curRevenueMonth2 = await orderService.getOrderByMonth(curMonth2.getMonth() + 1);
    const curRevenueMonth3 = await orderService.getOrderByMonth(curMonth3.getMonth() + 1);
    
    let totalMonth = 0;
    let totalRevenueMonth = 0;

    curRevenueMonth.forEach(element => {
        totalMonth+= element.totalPrice ? Number(element.totalPrice): 0;
    });
    revenue["curMonth1"] = totalMonth;
    totalRevenueMonth+=totalMonth;
    totalMonth=0;

    curRevenueMonth1.forEach(element => {
        totalMonth+= element.totalPrice ? Number(element.totalPrice): 0;
    });
    revenue["curMonth2"] = totalMonth;
    totalRevenueMonth+=totalMonth;
    totalMonth=0;

    curRevenueMonth2.forEach(element => {
        totalMonth+= element.totalPrice ? Number(element.totalPrice): 0;
    });
    revenue["curMonth3"] = totalMonth;
    totalRevenueMonth+=totalMonth;
    totalMonth=0;

    curRevenueMonth3.forEach(element => {
        totalMonth+= element.totalPrice ? Number(element.totalPrice): 0;
    });
    revenue["curMonth4"] = totalMonth;
    totalRevenueMonth+=totalMonth;
    totalMonth=0;

    const listBookRaw = await orderItemListService.getTop4();
    
    listBook = listBookRaw[0];

    revenue["book1"] = listBook[0].book_id;
    revenue["book2"] = listBook[1].book_id;
    revenue["book3"] = listBook[2].book_id;
    revenue["book4"] = listBook[3].book_id;
    revenue["book5"] = listBook[4].book_id;

    revenue["quantity1"] = listBook[0]["SUM(quantity)"];
    revenue["quantity2"] = listBook[1]["SUM(quantity)"];
    revenue["quantity3"] = listBook[2]["SUM(quantity)"];
    revenue["quantity4"] = listBook[3]["SUM(quantity)"];
    revenue["quantity5"] = listBook[4]["SUM(quantity)"];

    res.render('admin/chart',   {layout: 'admin-main', 
                                revenue, 
                                totalRevenue, 
                                totalRevenueMonth, 
                                listBook,
                                admin: req.cookies.admin})
});

module.exports = router;