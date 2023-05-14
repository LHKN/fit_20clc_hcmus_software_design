const Sequelize = require('sequelize');
const operatorsAliases = require('./operatorAlias');

module.exports = new Sequelize(
    'mangabookstore', 'mjkundta', 'Toan123456', {
        dialect:'mysql',
        host: 'www.db4free.net',
        operatorsAliases: operatorsAliases
    }
);