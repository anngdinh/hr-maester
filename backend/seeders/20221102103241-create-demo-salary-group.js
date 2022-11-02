'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('salary_group_rules', [
      {
        name: 'Total income',
        alias: 'total_income',
        description: 'Define total income for all employee',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Free income tax',
        alias: 'free_income_tax',
        description: 'Define Free income tax for all employee',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Tax deduction',
        alias: 'tax_deduction',
        description: 'Define Tax deduction for all employee',
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('salary_group_rules', null, {});
  }
};
