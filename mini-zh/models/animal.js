'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Animal extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Human, { foreignKey: 'ownerId', as: 'owner' })
      this.belongsToMany(models.Food, { through: 'AnimalFood', timestamps: false })
    }
  }
  Animal.init({
    name: DataTypes.STRING,
    age: DataTypes.INTEGER,
    mammal: DataTypes.BOOLEAN,
    chip: DataTypes.STRING,
    ownerId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Animal',
  });
  return Animal;
};
