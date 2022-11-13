'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class export_payroll_monthly_final extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of DataTypes lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  export_payroll_monthly_final.init({
    export_payroll_monthly_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: "export_payroll_monthlies",
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
  }, {
    sequelize,
    modelName: 'export_payroll_monthly_final',
  });
  return export_payroll_monthly_final;
};