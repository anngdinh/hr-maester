'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('custom_fields', [
      {
        id: 1,
        name: 'Coefficient Salary',
        alias: 'coefficient_salary',
        description: '',
        type: 'normal',
        value: 0,
      },
    ], {});

    await queryInterface.bulkInsert('custom_field_values', [
      {
        custom_field_id: 1,
        employeeId: 1,
        value: 2,
      },
      {
        custom_field_id: 1,
        employeeId: 2,
        value: 3,
      },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('custom_fields', null, {});
    await queryInterface.bulkDelete('custom_field_values', null, {});
  }
};
