const { DataTypes } = require('sequelize');
const db = require('../config/database');

const OrderStatus = db.define('OrderStatus', 
    {
        statusId:{
            field: 'id',
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false
        },
        name:{
            type: DataTypes.STRING
        }
    },
    {
        tableName: 'order_status',
        timestamps: false
    }

);

OrderStatus.sync()
    .then(() => console.log('Order Status sync successfully'))
    .catch(error => console.log(error));

module.exports = OrderStatus;