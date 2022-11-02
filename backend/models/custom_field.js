'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class custom_field extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of DataTypes lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  custom_field.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    name: {
      type: DataTypes.STRING
    },
    alias: {
      type: DataTypes.STRING
    },
    description: {
      type: DataTypes.STRING
    },
    type: {
      type: DataTypes.STRING
    },
    value: {
      type: DataTypes.INTEGER
    },
  }, {
    sequelize,
    modelName: 'custom_field',
  });
  return custom_field;
};