'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('salary_rules', [
      {
        name: 'Basic salary',
        alias: 'basic_salary',
        isIncome: true,
        description: 'Basic salary for all employee',
        query: 'No query',
        valid: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Lunch allowance',
        alias: 'lunch_allowance',
        isIncome: true,
        description: 'Lunch allowance for all employee',
        query: 'No query',
        valid: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },

    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('salary_rules', null, {});
  }
};
