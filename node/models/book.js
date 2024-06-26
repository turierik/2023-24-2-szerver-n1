'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Book extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Human, { as: 'author', foreignKey: 'authorId' })
      this.belongsToMany(models.Store, { through: 'BookStore', timestamps: false })
    }
  }
  Book.init({
    title: DataTypes.STRING,
    pages: DataTypes.INTEGER,
    hardcover: DataTypes.BOOLEAN,
    authorId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Book',
  });
  return Book;
};