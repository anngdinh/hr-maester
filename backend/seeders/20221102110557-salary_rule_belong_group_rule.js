'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('salary_rule_belong_group_rules', [
      {
        salary_rule_id: 1,
        salary_group_rule_id: 1,
      },
      {
        salary_rule_id: 2,
        salary_group_rule_id: 2
      },

    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('salary_rule_belong_group_rules', null, {});
  }
};
