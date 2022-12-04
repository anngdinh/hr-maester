'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('salary_rule_formulas', [
      {
        salary_rule_id: 3,
        column_id: 1,
        value: "200",
      },
      {
        salary_rule_id: 3,
        column_id: 2,
        value: "table.A + 100",
      },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('salary_rule_formulas', null, {});
  }
};
