'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class salary_rule extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of DataTypes lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  salary_rule.init({
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
    isGroup: {
      type: DataTypes.BOOLEAN
    },
    isBasicFormula: {
      type: DataTypes.BOOLEAN
    },
    formula: {
      type: DataTypes.STRING
    },
    query: {
      type: DataTypes.STRING
    },
    groupBelongId: {
      type: DataTypes.INTEGER,
      references: {
        model: "salary_rules",
        key: "id"
      }
    },
    state: {
      type: DataTypes.BOOLEAN
    },
  }, {
    sequelize,
    modelName: 'salary_rule',
  });
  return salary_rule;
};