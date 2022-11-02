'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('salary_rule_formulas', {
      salary_rule_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
          model: "salary_rules",
          key: "id"
        }
      },
      column_id: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true,
      },
      value: {
        type: Sequelize.STRING
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('salary_rule_formulas');
  }
};