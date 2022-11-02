'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class salary_rule_belong_group_rule extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of DataTypes lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  salary_rule_belong_group_rule.init({
    salary_rule_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: "salary_rules",
        key: "id"
      }
    },
    salary_group_rule_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: "salary_group_rules",
        key: "id"
      }
    }
  }, {
    sequelize,
    modelName: 'salary_rule_belong_group_rule',
    timestamps: false
  });
  return salary_rule_belong_group_rule;
};