const Author = require('../models/author.model');

const authorService = {
  getAllAuthor: () => {
    return new Promise((resolve, reject) => {
      try {
        const authors = Author.findAll({ raw: true });
        return resolve(authors);
      } catch (error) {
        console.log(error);
        return reject(error);
      }
    })
  },
  getAuthorById: (id) => {
    return new Promise((resolve, reject) => {
      try {
        const author = Author.findOne({
          where: {
            id: id
          },
          raw: true
        });
        return resolve(author);
      } catch (error) {
        return reject(error);
      }
    })
  },
  createAuthor: (data) => {
    return new Promise(async (resolve, reject) => {
      try {
        await Author.sync();
        const result = await Author.create({

          name: data
        });
        return resolve(result);
      } catch (error) {
        return reject(error);
      }
    })
  },
  updateAuthor: (newName, idAu) => {
    return new Promise(async (resolve, reject) => {
      try {
        const author = Author.update(
          {
            name: newName,
          },
          {
            where: { id: idAu },
          });
        return resolve(author);
      } catch (error) {
        return reject(error);
      } 
    })
  },
  deleteAuthor: (authorId) =>{
    return new Promise(async (resolve, reject) => {
      try {
        const author = Author.destroy(
          {
            where: { id: authorId },
          });
        return resolve(author);
      } catch (error) {
        return reject(error);
      } 
    })
  }
}

module.exports = authorService;