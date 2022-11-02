'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class custom_field_value extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of DataTypes lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  custom_field_value.init({
    custom_field_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      references: {
        model: "custom_fields",
        key: "id"
      }
    },
    employeeId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      references: {
        model: "Employees",
        key: "id"
      }
    },
    value: {
      type: DataTypes.STRING
    },
  }, {
    sequelize,
    modelName: 'custom_field_value',
    timestamps: false,
  });
  return custom_field_value;
};