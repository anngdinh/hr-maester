'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Employees', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      firstName: {
        type: Sequelize.STRING
      },
      lastName: {
        type: Sequelize.STRING
      },
      sex: {
        type: Sequelize.STRING
      },
      birthday: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      phoneNumber: {
        type: Sequelize.STRING
      },
      address: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      // positionId: {
      //   type: Sequelize.DataTypes.INTEGER,
      //   References: {
      //     tableName: "Position",
      //     schema: "schema",
      //   },
      //   key: id,
      // },
      // supervisionId:{
      //   type: Sequelize.DataTypes.INTEGER,
      //   References: {
      //     tableName: "Employees",
      //     schema: "schema",
      //   },
      //   key: id,
      // }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Employees');
  }
};