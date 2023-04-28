const Book = require('../models/book.model');
const db = require('../config/database');

const bookService = {
  getAllBooks: () => {
    return new Promise(async (resolve, reject) => {
      try {
        const books = Book.findAll({ raw: true });
        return resolve(books);
      } catch (error) {
        return reject(error);
      }
    })
  },
  getBookById: (id) => {
    return new Promise(async (resolve, reject) => {
      try {
        const book = await Book.findOne({
          where: {
            id: {
              $eq: id
            }
          },
          raw: true
        });
        return resolve(book);
      } catch (error) {
        return reject(error);
      }
    })
  },

  searchBook: (query, from, to) => {
    return new Promise(async (resolve, reject) => {
      try {
        const books = Book.findAll({
          where: {
            $and: [
              {
                title: {
                  $substring: `${query.name}`
                }
              },
              {
                categoryId: (query.cat == 0) ?
                  { $ne: null } :
                  { $eq: query.cat }
              },
              {
                price:{
                  $gte: from
                }
              },
              {
                price:{
                  $lte: to
                }
              }
            ]
          },
          raw: true
        });
        return resolve(books);
      } catch (error) {
        return reject(error);
      }
    })
  },
  searchBookByLimit: (query, startingLimit, resultPerPage, from, to) => {
    return new Promise(async (resolve, reject) => {
      try {
        const books = await Book.findAll({
          offset: startingLimit,
          limit: resultPerPage,
          where: {
            $and: [
              {
                title: {
                  $substring: `${query.name}`
                }
              },
              {
                categoryId: (query.cat == 0) ?
                  { $ne: null } :
                  { $eq: query.cat }
              },
              {
                price:{
                  $gte: from
                }
              },
              {
                price:{
                  $lte: to
                }
              }
            ]
          },
          raw: true
        });
        return resolve(books);
      } catch (error) {
        return reject(error);
      }
    })
  },

  getBooksByCategoryId: (categoryId) => {
    return new Promise(async (resolve, reject) => {
      try {
        const books = await Book.findAll({
          where: {
            categoryId: {
              $eq: categoryId
            }
          },
          raw: true
        });
        return resolve(books);
      } catch (error) {
        return reject(error);
      }
    });
  },

  getBooksLimit(startingLimit, resultPerPage) {
    return new Promise(async (resolve, reject) => {
      try {
        const books = Book.findAll({ offset: startingLimit, limit: resultPerPage, raw: true });
        return resolve(books);
      }
      catch (error) {
        return reject(error);
      }
    })
  },

  searchBookAndSortedByLimit(query, startingLimit, resultPerPage, from, to) {
    return new Promise(async (resolve, reject) => {
      try {
        if (query.sort == 'asc') {
          const books = await Book.findAll({
            offset: startingLimit, limit: resultPerPage,
            where: {
              $and: [
                {
                  title: {
                    $substring: `${query.name}`
                  }
                },
                {
                  categoryId: (query.cat == 0) ?
                    { $ne: null } :
                    { $eq: query.cat }
                },
                {
                  price:{
                    $gte: from
                  }
                },
                {
                  price:{
                    $lte: to
                  }
                }
              ]
            },
            order: [
              ['title', 'ASC'],
            ],
            raw: true
          });
          return resolve(books);
        }
        else if (query.sort == 'desc') {
          const books = await Book.findAll({
            offset: startingLimit, limit: resultPerPage,
            where: {
              $and: [
                {
                  title: {
                    $substring: query.name
                  }
                },
                {
                  categoryId: (query.cat == 0) ?
                    { $ne: null } :
                    { $eq: query.cat }
                },
                {
                  price:{
                    $gte: from
                  }
                },
                {
                  price:{
                    $lte: to
                  }
                }
              ]
            },
            order: [
              ['title', 'DESC'],
            ],
            raw: true
          });
          return resolve(books);
        }
        else {
          const books = await Book.findAll({
            offset: startingLimit, limit: resultPerPage,
            where: {
              $and: [
                {
                  title: {
                    $substring: query.name
                  }
                },
                {
                  categoryId: (query.cat == 0) ?
                    { $ne: null } :
                    { $eq: query.cat }
                },
                {
                  price:{
                    $gte: from
                  }
                },
                {
                  price:{
                    $lte: to
                  }
                }
              ]
            },
            order: [
              ['price', 'ASC'],
            ],
            raw: true
          });
          return resolve(books);
        }
      } catch (error) {
        return reject(error);
      }
    });
  },
  searchBookAndSorted(query, from, to) {
    return new Promise(async (resolve, reject) => {
      try {
        if (query.sort == 'asc') {
          const books = Book.findAll({
            where: {
              $and: [
                {
                  title: {
                    $substring: `${query.name}`
                  }
                },
                {
                  categoryId: (query.cat == 0) ?
                    { $ne: null } :
                    { $eq: query.cat }
                },
                {
                  price:{
                    $gte: from
                  }
                },
                {
                  price:{
                    $lte: to
                  }
                }
              ]
            },
            order: [
              ['title', 'ASC'],
            ],
            raw: true
          });
          return resolve(books);
        }
        else if (query.sort == 'desc') {
          const books = Book.findAll({
            where: {
              $and: [
                {
                  title: {
                    $substring: query.name
                  }
                },
                {
                  categoryId: (query.cat == 0) ?
                    { $ne: null } :
                    { $eq: query.cat }
                },
                {
                  price:{
                    $gte: from
                  }
                },
                {
                  price:{
                    $lte: to
                  }
                }
              ]
            },
            order: [
              ['title', 'DESC'],
            ],
            raw: true
          });
          return resolve(books);
        }
        else {
          const books = Book.findAll({
            where: {
              $and: [
                {
                  title: {
                    $substring: query.name
                  }
                },
                {
                  categoryId: (query.cat == 0) ?
                    { $ne: null } :
                    { $eq: query.cat }
                },
                {
                  price:{
                    $gte: from
                  }
                },
                {
                  price:{
                    $lte: to
                  }
                }
              ]
            },
            order: [
              ['price', 'ASC'],
            ],
            raw: true
          });
          return resolve(books);
        }
      } catch (error) {
        return reject(error);
      }
    });
  },
  getLatestBooks: () => {
    return new Promise(async (resolve, reject) => {
      try {
        const latestBooks = Book.findAll({
          order: [
            ['createdAt', 'DESC']
          ],
          limit: 4,
          raw: true
        });
        return resolve(latestBooks);
      } catch (error) {
        return reject(error);
      }
    })
  },
  updateBookById: (bookId, data) => {
    return new Promise(async (resolve, reject) => {
      try {
        const result = await Book.update(data, {
          where: {
            id: bookId
          }
        });
        return resolve(result);
      } catch (error) {
        return reject(error);
      }
    })
  },
  deleteBookById: (bookId) => {
    return new Promise(async (resolve, reject) => {
      try {
        const result = await Book.destroy({
          where: {
          id: bookId
        }
        });
        return resolve(result);
      } catch (error) {
        return reject(error);
      }
    })
  },
  createBook: (data) => {
    return new Promise(async (resolve, reject) => {
      try {
        await Book.sync();
        const result = await Book.create(data);
        return resolve(result);
      } catch (error) {
        return reject(error);
      }
    })
  },
  deleteBookByAuthor: (idAuthor) =>{
    return new Promise(async (resolve, reject) => {
      try {
        const result = await Book.destroy({
          where: {
            authorId: idAuthor
          }
        });
        return resolve(result);
      } catch (error) {
        return reject(error);
      }
    })
  },
  deleteBookByPublisher:(idPub) =>{
    return new Promise(async (resolve, reject) => {
      try {
        const result = await Book.destroy({
          where: {
            publisherId: idPub
          }
        });
        return resolve(result);
      } catch (error) {
        return reject(error);
      }
    })
  },
  deleteBookByCategory: (idCat) =>{
    return new Promise(async (resolve, reject) => {
      try {
        const result = await Book.destroy({
          where: {
            categoryId: idCat
          }
        });
        return resolve(result);
      } catch (error) {
        return reject(error);
      }
    })
  }
}

module.exports = bookService;