const { DataTypes } = require('sequelize');
const db = require('../config/database');

const Review = db.define('Review',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true
    },
    userId: {
      field: 'user_id',
      type: DataTypes.STRING
    },
    username: {
      type: DataTypes.STRING
    },
    rating: {
      type: DataTypes.INTEGER
    },
    comment: {
      type: DataTypes.TEXT
    },
    bookId: {
      field: 'book_id',
      type: DataTypes.INTEGER
    },
    createdAt: {
      field: 'created_at',
      type: DataTypes.DATE
    },
    updatedAt: {
      field: 'updated_at',
      type: DataTypes.DATE
    }
  },
  {
    tableName: 'reviews',
    timestamps: false
  }
)

Review.sync()
  .then(() => console.log('Review sync successfully'))
  .catch(error => console.log(error));

module.exports = Review;