const { DataTypes } = require('sequelize');
const db = require('../config/database');

const Publisher = db.define('Publisher',
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
        tableName: 'publishers',
        timestamps: false
    }
)

Publisher.sync()
    .then(() => console.log('Publisher sync successfully'))
    .catch(error => console.log(error));

module.exports = Publisher;