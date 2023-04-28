const { DataTypes } = require('sequelize');
const db = require('../config/database');

const Order = require("./order.model");

const User = db.define('User',
    {
        id: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        isConfirmed: {
            field: 'is_confirmed',
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        dob: {
            type: DataTypes.STRING
        },
        phone: {
            type: DataTypes.STRING
        },
        isAdmin: {
            field: 'is_admin',
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        password: {
            type: DataTypes.STRING
        },
        email: {
            type: DataTypes.STRING
        },
        avatarUrl: {
            field: 'avatar_url',
            type: DataTypes.STRING
        },
        createdAt: {
            field: 'created_at',
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        },
        updateAt: {
            field: 'updated_at',
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        },
        isBanned: {
            field: 'is_banned',
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    },
    {
        tableName: 'users',
        timestamps: false,
    }
);

User.sync()
    .then(() => console.log('User sync successfully'))
    .catch(error => console.log(error));

module.exports = User;