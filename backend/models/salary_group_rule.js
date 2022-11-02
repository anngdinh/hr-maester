'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class salary_group_rule extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of DataTypes lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  salary_group_rule.init({
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
  }, {
    sequelize,
    modelName: 'salary_group_rule',
  });
  return salary_group_rule;
};