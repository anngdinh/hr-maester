'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class preview_payroll_monthly extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of DataTypes lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  preview_payroll_monthly.init({
    payroll_monthly_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: "payroll_monthlies",
        key: "id"
      }
    },
    salary_rule_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: "salary_rules",
        key: "id"
      }
    },
    employee_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: "Employees",
        key: "id"
      }
    },
    value: {
      type: DataTypes.INTEGER
    },
    isModified: {
      type: DataTypes.BOOLEAN
    },
    newValue: {
      type: DataTypes.INTEGER
    },
  }, {
    sequelize,
    modelName: 'preview_payroll_monthly',
  });
  return preview_payroll_monthly;
};