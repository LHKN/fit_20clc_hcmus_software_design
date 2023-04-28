const express = require("express");
const bookService = require("../../../services/book.service");
const router = express.Router();
const reviewService = require('../../../services/review.service');
const userService = require("../../../services/user.service");

router.post('/create', async (req, res) => {
  const userId = req.cookies['user']?.id;
  const { rating, bookId, comment, username } = req.body;
  try {
    const user = userId ? await userService.getUserById(userId) : null;

    //create review
    const data = {
      userId,
      rating: Number(rating),
      bookId: Number(bookId),
      username: user ? user.name : username,
      comment
    };
    const result = await reviewService.createReview(data);

    //update book's rating
    const allReviews = await reviewService.getReviewsByBookId(bookId);
    const averageRating = Math.round(allReviews.reduce((sum, review) => sum + review.rating, 0) / allReviews.length);
    await bookService.updateBookById(bookId, { overallRating: averageRating });
    return res.redirect(`/customer/product_details/${bookId}`);
  } catch (error) {
    console.log(error);
    return res.status(500).render('customer/error500');
  }
})

module.exports = router;