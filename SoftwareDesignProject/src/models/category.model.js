const { DataTypes } = require('sequelize');
const db = require('../config/database');

const Category = db.define('Category',
    {
        id: {
            type: DataTypes.SMALLINT,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
        },
        imgUrl: {
            field: 'img_url',
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    {
        tableName: 'categories',
        timestamps: false
    }
)

Category.sync()
    .then(() => console.log('Category sync successfully'))
    .catch(error => console.log(error));

module.exports = Category;