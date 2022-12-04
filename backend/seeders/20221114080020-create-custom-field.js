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
        type: 'normal', // normal, monthly, salary =>   ..., month, ruleID
        value: 0,
      },
      {
        id: 2,
        name: 'Position',
        alias: 'position',
        description: '',
        type: 'normal',
        value: 0,
      },

      {
        id: 3,
        name: 'Field in rule',
        alias: 'field_in_rule',
        description: '',
        type: 'salary',
        value: 1,
      },

      {
        id: 4,
        name: 'Working day',
        alias: 'working_day',
        description: '',
        type: 'monthly',
        value: '202212',
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
      {
        custom_field_id: 2,
        employeeId: 1,
        value: 10,
      },

      {
        custom_field_id: 3,
        employeeId: 1,
        value: 5,
      },
      {
        custom_field_id: 3,
        employeeId: 2,
        value: 10,
      },

      {
        custom_field_id: 4,
        employeeId: 1,
        value: 20,
      },
      {
        custom_field_id: 4,
        employeeId: 2,
        value: 30,
      },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('custom_fields', null, {});
    await queryInterface.bulkDelete('custom_field_values', null, {});
  }
};
