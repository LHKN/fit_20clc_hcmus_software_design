const { DataTypes } = require('sequelize');
const db = require('../config/database');

const OrderItemList = db.define('OrderItemList', 
    {
        orderId:{
            field: 'order_id',
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false
        },
        quantity:{
            type: DataTypes.INTEGER,
            defaultValue: DataTypes.INTEGER(1)
        },
        bookId:{
            field: 'book_id',
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false
        }
    },
    {
        tableName: 'order_item_lists',
        timestamps: false
    }

);

OrderItemList.sync()
    .then(() => console.log('Order Item List sync successfully'))
    .catch(error => console.log(error));

module.exports = OrderItemList;