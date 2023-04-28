const express = require("express");

const router = express.Router();
const bookService = require("../../../services/book.service");
const categoryService = require("../../../services/category.service");
const authorService = require("../../../services/author.service");
const publisherService = require("../../../services/publisher.service");
const Language = require("../../../models/enums/language.enum");
const cartService = require("../../../services/cart.service");
const helperService = require("../../../services/helper.service");
const userService = require("../../../services/user.service");
const reviewService = require("../../../services/review.service");
const _ = require("lodash");
const moment = require('moment');
const orderService = require("../../../services/order.service");

router.get("/:id", async (req, res, next) => {
  const userId = req.cookies["user"]?.id;
  const cartQuantity = userId ? await cartService.getCartQuantity(userId) : 0;
  const orders = userId ? await orderService.getOrdersByUserId(userId) : [];
  try {
    //get book
    const id = req.params.id;
    const book = helperService.formatBooks(await bookService.getBookById(id));
    //get reviews
    const reviews = await reviewService.getReviewsByBookId(id);
    let detailedReviews = [];
    if (!_.isEmpty(reviews)) {
      const userPromises = reviews
        .filter((review) => review.userId)
        .map((review) => userService.getUserById(review.userId));
      const userDetails = await Promise.all(userPromises);
      detailedReviews = reviews.map((review) => {
        const user = userDetails.find((user) => user.id === review.userId);
        const star = review.rating;
        const starLeft = 5 - star;
        const createdAt = moment(review.createdAt).format('MMM DD YYYY')
        return { ...review, user, star, starLeft, createdAt };
      });
    }

    //get additional information
    const author = await authorService.getAuthorById(book.authorId);
    const publisher = await publisherService.getPublisherById(book.publisherId);
    const user = userId ? await userService.getUserById(userId) : null;
    Object.assign(book, {
      author: author.name,
      publisher: publisher.name,
      language: Language[book.language],
      star: book.overallRating,
      starLeft: 5 - book.overallRating,
    });
    const categories = await categoryService.getAllCategories();
    const relatedBooks = helperService.formatBooks(await bookService.getBooksByCategoryId(
      book.categoryId
    ));
    console.log('book: ', book);
    res.render("customer/product_details", {
      user,
      book,
      relatedBooks,
      categories,
      cartQuantity,
      reviews: detailedReviews,
      orders
    });
  } catch (error) {
    console.log(error);
    res.render("customer/error500", { cartQuantity, orders });
  }
});

module.exports = router;
