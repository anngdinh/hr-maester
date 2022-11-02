'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class salary_group_rule_dependency extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of DataTypes lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  salary_group_rule_dependency.init({
    rule_id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.INTEGER,
      references: {
        model: "salary_rules",
        key: "id"
      }
    },
    group_rule_depend: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.INTEGER,
      references: {
        model: "salary_group_rules",
        key: "id"
      }
    },
  }, {
    sequelize,
    modelName: 'salary_group_rule_dependency',
    timestamps: false,
  });
  return salary_group_rule_dependency;
};