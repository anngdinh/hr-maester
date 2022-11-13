'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('salary_rules', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      alias: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
      isGroup: {
        type: Sequelize.BOOLEAN
      },
      isBasicFormula: {
        type: Sequelize.BOOLEAN
      },
      formula: {
        type: Sequelize.STRING
      },
      query: {
        type: Sequelize.STRING
      },
      groupBelongId: {
        type: Sequelize.INTEGER,
        references: {
          model: "salary_rules",
          key: "id"
        }
      },
      state: {
        type: Sequelize.BOOLEAN
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: new Date()
        
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: new Date()
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('salary_rules');
  }
};