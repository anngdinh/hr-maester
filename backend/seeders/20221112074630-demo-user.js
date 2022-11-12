'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Employees', [
      {
        id: 1,
        firstName: 'Nguyen Dinh',
        lastName: 'An',
        sex: 'male',
        birthday: '',
        email: 'an@maester.com',
        phoneNumber: '012345678',
        address: '120 Matthan, New York',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        firstName: 'Nguyen Thuc',
        lastName: 'Quan',
        sex: 'male',
        birthday: '',
        email: 'quan@maester.com',
        phoneNumber: '012345678',
        address: 'KTX khu A, DHQG HCM',
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Employees', null, {});
  }
};
