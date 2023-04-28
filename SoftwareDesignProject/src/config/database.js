const Sequelize = require('sequelize');
const operatorsAliases = require('./operatorAlias');

module.exports = new Sequelize(
    'bookstore', 'root', 'root', {
        dialect:'mysql',
        operatorsAliases: operatorsAliases
    }
);