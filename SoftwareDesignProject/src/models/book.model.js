const { DataTypes } = require('sequelize');
const db = require('../config/database');

const Book = db.define('Book',
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        authorId: {
            field: 'author_id',
            type: DataTypes.INTEGER,
            allowNull: false
        },
        publisherId: {
            field: 'publisher_id',
            type: DataTypes.INTEGER,
            allowNull: false
        },
        releaseYear: {
            field: 'release_year',
            type: DataTypes.STRING,
            allowNull: false
        },
        price: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        description: {
            type: DataTypes.TEXT
        },
        language: {
            type: DataTypes.STRING,
            allowNull: false
        },
        createdAt: {
            field: 'created_at',
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        },
        updatedAt: {
            field: 'updated_at',
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        },
        categoryId: {
            field: 'category_id',
            type: DataTypes.SMALLINT,
            allowNull: false
        },
        overallRating: {
            field: 'overall_rating',
            type: DataTypes.SMALLINT
        },
        imageUrl: {
            field: 'image_url',
            type: DataTypes.STRING
        }
    },
    {
        tableName: 'books',
        timestamps: false
    }
);

Book.sync()
    .then(() => console.log('Book sync successfully'))
    .catch(error => console.log(error));

module.exports = Book;