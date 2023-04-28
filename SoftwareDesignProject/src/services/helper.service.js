const _ = require('lodash');


function formatPrice(price) {
  return price.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
}

const helperService = {
  formatPrice: (price) => {
    return formatPrice(price);
  },

  formatBooks: (books) => {
    return _.isArray(books)?books.map(book => {
      return { ...book, price: formatPrice(book.price)}
    }):{...books, price: formatPrice(books.price)};
  },

  formatProducts: (products) => {
    return _.isArray(products) ? products.map(product => {
      return {...product, price: formatPrice(product.price), total: formatPrice(product.total)}
    }): {...products, price: formatPrice(products.price), total: formatPrice(products.total)}
  }
}

module.exports = helperService;