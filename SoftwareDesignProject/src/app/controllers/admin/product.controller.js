const express = require('express');
const authorService = require('../../../services/author.service');
const bookService = require('../../../services/book.service');
const categoryService = require('../../../services/category.service');
const publisherService = require('../../../services/publisher.service');
const fileService = require('../../../services/file.service');
const _ = require('lodash');
const router = express.Router();
const path = require('path');
const appRoot = require('app-root-path');
const orderService = require('../../../services/order.service');
const orderItemListService = require('../../../services/order_item_lists.service');
const reviewService = require('../../../services/review.service');


router.get('/:id', async (req, res) => {
  const bookId = req.params.id;
  const { success } = req.query;
  try {
    let categories = await categoryService.getAllCategories();
    let authors = await authorService.getAllAuthor();
    let publishers = await publisherService.getAllPublisher();
    let book = await bookService.getBookById(bookId);
    book = {
      ...book,
      author: _.remove(authors, (author) => author.id === book.authorId)[0],
      publisher: _.remove(publishers, (publisher) => publisher.id === book.publisherId)[0],
      category: _.remove(categories, (category) => category.id === book.categoryId)[0]
    }
    const message = _.isEmpty(success) ? null : {
      content: success === 'true' ? 'Book updated' : 'Update failed',
      alert: success === 'true' ? 'success' : 'danger'
    }
    res.render('admin/product_detail', { layout: 'admin-main', book, categories, publishers, authors, message });
  } catch (error) {
    console.log(error);
    return res.render('admin/error500', { layout: 'admin-main' });
  }
})

router.post('/update_image/:bookId', async (req, res) => {
  const bookId = Number(req.params.bookId);
  try {
    const uploadDir = path.join(appRoot.toString(), 'src/public/customers/img/themes/images/products');
    const options = {
      uploadDir: uploadDir,
      multiples: true,
      maxFileSize: 100 * 1024 * 1024,
      keepExtensions: true,
      filter: function ({ name, originalFilename, mimetype }) {
        return mimetype && mimetype.includes('image');
      }
    }
    const files = await fileService.saveFile(req, options);

    const data = {
      imageUrl: _.isEmpty(files) ? null : '/customers/img/themes/images/products/' + files.newFilename
    };
    const result = await bookService.updateBookById(bookId, data);
    return res.redirect(`/admin/product/${bookId}?success=true`);
  } catch (error) {
    console.log(error);
    return res.redirect(`/admin/product/${bookId}?success=true`);
  }
});

router.post('/edit', async (req, res) => {
  try {
    const { id, ...book } = req.body;
    const result = await bookService.updateBookById(id, book);
    if (!result) return res.redirect(`/admin/product/${id}?success=false`);
    return res.redirect(`/admin/product/${id}?success=true`);
  } catch (error) {
    console.log(error);
    return res.render('admin/error500', { layout: 'admin-main' });
  }
});

router.post('/delete', async (req, res) => {
  try {
    const { id } = req.body;
    const orderIds = await orderItemListService.getAllOrderByBookId(id);
    if (!_.isEmpty(orderIds)) {
      const orderIdList = _.uniq(orderIds.map(order => order.orderId));
      const deleteOrderItemPromises = orderIdList.map(id => orderItemListService.deleteOrderItemById(id));
      const deleteOrderItemResult = await Promise.all(deleteOrderItemPromises);
      const deleteOrderPromises = orderIdList.map(id => orderService.deleteOrderById(id));
      const deleteOrderResult = await Promise.all(deleteOrderPromises);
    }
    const reviews = await reviewService.getReviewsByBookId(id);
    if (!_.isEmpty(reviews)) {
      const deleteReviewResult = await reviewService.deleteReviewByBookId(id);
    }
    const result = await bookService.deleteBookById(id);
    return res.redirect('/admin/table_product');
  } catch (error) {
    console.log(error);
    return res.render('admin/error500', { layout: 'admin-main' });
  }
});

router.post('/create', async (req, res) => {
  const data = req.body;
  try {
    const result = await bookService.createBook(data);
    return res.redirect('/admin/table_product');
  } catch (error) {
    console.log(error);
    return res.render('admin/error500', { layout: 'admin-main' });
  }
})

module.exports = router;