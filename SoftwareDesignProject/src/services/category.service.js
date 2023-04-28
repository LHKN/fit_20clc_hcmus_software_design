const Category = require('../models/category.model');

const categoryService = {
  getAllCategories: ()=> {
    return new Promise(async (resolve, reject) => {
      try {
        const categories = Category.findAll({ raw: true });
        return resolve(categories);
      } catch (error) {
        return reject(error);
      }
    })
  },
  createCategory: (newName, newImgUrl)=>{
    return new Promise(async (resolve, reject) => {
      try {
        const categories = Category.create({ name: newName, imgUrl: newImgUrl });
        return resolve(categories);
      } catch (error) {
        return reject(error);
      }
    })
  },
  getCategoryById:(idCat)=>{
    return new Promise(async (resolve, reject) => {
      try {
        const categories = Category.findOne(
          { 
          where: {
            id: idCat
          }, 
          raw: true });
        return resolve(categories);
      } catch (error) {
        return reject(error);
      }
    })
  },
  updateCategoryById:(idCat, newName) =>{
    return new Promise(async (resolve, reject) => {
      try {
        const categories = Category.update(
          {name: newName },
          { where: {id: idCat}
        });
        return resolve(categories);
      } catch (error) {
        return reject(error);
      }
    })
  },
  updateCatImgById:(idCat, url)=>{
    return new Promise(async (resolve, reject) => {
      try {
        const categories = Category.update(
          {imgUrl: url },
          { where: {id: idCat}
        });
        return resolve(categories);
      } catch (error) {
        return reject(error);
      }
    })
  },
  deleteCategory: (idCat)=>{
    return new Promise(async (resolve, reject) => {
      try {
        const categories = Category.destroy(
          { where: {id: idCat}
        });
        return resolve(categories);
      } catch (error) {
        return reject(error);
      }
    })
  }
}

module.exports = categoryService;