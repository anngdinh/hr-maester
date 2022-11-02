'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class payroll_monthly extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of DataTypes lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  payroll_monthly.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    monthId: {
      type: DataTypes.INTEGER,
      references: {
        model: "months",
        key: "id"
      }
    },
    name: {
      type: DataTypes.STRING
    },
    canModify: {
      type: DataTypes.BOOLEAN
    },
  }, {
    sequelize,
    modelName: 'payroll_monthly',
  });
  return payroll_monthly;
};