'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('variables', [
      {
        id: 1,
        rule_id: 1,
        name: "tax1",
        alias: "tax1",
        value: 2,
      },
      {
        id: 2,
        rule_id: 1,
        name: "tax2",
        alias: "tax2",
        value: 3,
      },

      {
        id: 3,
        rule_id: 2,
        name: "tax1",
        alias: "tax1",
        value: 4,
      },
      {
        id: 4,
        rule_id: 2,
        name: "tax2",
        alias: "tax2",
        value: 5,
      },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('variables', null, {});
  }
};
