'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('export_payroll_monthlies', [
      {
        id: 1,
        month: 12,
        name: "INIT PAYROLL",
        canModify: true,
      },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('export_payroll_monthlies', null, {});
  }
};
