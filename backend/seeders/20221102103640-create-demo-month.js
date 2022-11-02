'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('months', [
      {
        id: 1,
        value: '092022',
      },
      {
        id: 2,
        value: '102022',
      },
      {
        id: 3,
        value: '112022',
      },
      {
        id: 4,
        value: '122022',
      },
      {
        id: 5,
        value: '012023',
      },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('months', null, {});
  }
};
