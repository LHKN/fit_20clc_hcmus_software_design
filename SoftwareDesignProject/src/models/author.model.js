const { DataTypes } = require('sequelize');
const db = require('../config/database');

const Author = db.define('Author',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
        }
    },
    {
        tableName: 'authors',
        timestamps: false
    }
)

Author.sync()
    .then(() => console.log('Author sync successfully'))
    .catch(error => console.log(error));

module.exports = Author;