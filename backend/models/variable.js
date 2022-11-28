'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class variable extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of DataTypes lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  variable.init({
    id: {
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.INTEGER,
    },
    rule_id: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        model: "salary_rules",
        key: "id"
      }
    },
    name: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    alias: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    value: {
      allowNull: false,
      type: DataTypes.STRING,
    },
  }, {
    sequelize,
    modelName: 'variable',
    timestamps: false,
  });
  return variable;
};