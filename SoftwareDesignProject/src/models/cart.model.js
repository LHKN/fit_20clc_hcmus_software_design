const { DataTypes } = require('sequelize');
const db = require('../config/database');

const Cart = db.define( 'Cart', 
    {
        userId: {
            field: 'user_id',
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true
        },
        products: {
            type: DataTypes.STRING
        }
    },
    {
        tableName: 'cart',
        timestamps: false
    }
);

Cart.sync()
    .then(() => console.log('Cart sync successfully'))
    .catch(error => console.log(error));

module.exports = Cart;