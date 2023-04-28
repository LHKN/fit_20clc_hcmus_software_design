const { DataTypes } = require('sequelize');
const db = require('../config/database');

const User = require("./user.model");

const Order = db.define('Order',
    {
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        createAt:{
            field: 'created_at',
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        },
        address:{
            type: DataTypes.STRING,
            allowNull: false
        },
        phone:{
            type: DataTypes.STRING,
            allowNull: false
        },
        totalPrice:{
            field: 'total_price',
            type: DataTypes.INTEGER,
            allowNull: false
        },
        notes:{
            type: DataTypes.STRING
        },
        createdBy: {
            field:'created_by',
            type: DataTypes.STRING,
        },
        status: {
            field: 'status',
            type: DataTypes.SMALLINT
        }
    },
    {
        tableName: 'orders',
        timestamps: false
    }
);


Order.sync()
    .then(() => console.log('Order sync successfully'))
    .catch(error => console.log(error));

module.exports = Order;
