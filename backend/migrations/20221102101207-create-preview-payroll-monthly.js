'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('preview_payroll_monthlies', {
      payroll_monthly_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
          model: "payroll_monthlies",
          key: "id"
        }
      },
      salary_rule_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
          model: "salary_rules",
          key: "id"
        }
      },
      employee_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
          model: "Employees",
          key: "id"
        }
      },
      value: {
        type: Sequelize.INTEGER
      },
      isModified: {
        type: Sequelize.BOOLEAN
      },
      newValue: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('preview_payroll_monthlies');
  }
};