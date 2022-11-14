'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('salary_rules', [
      {
        id: 1,
        name: "NET INCOME",
        alias: 'net_income',
        description: 'LƯƠNG THỰC NHẬN',
        isGroup: true,
        isBasicFormula: true,
        formula: 'rid2 - rid3 - rid4 - rid5',
        query: '*',
        // groupBelongId: 0,
        state: true
      },
      {
        id: 2,
        name: "TOTAL DERIVED INCOME",
        alias: 'total_derived_income',
        description: 'TỔNG THU NHẬP TRONG THÁNG',
        isGroup: true,
        isBasicFormula: true,
        formula: 'SUM',
        query: '*',
        groupBelongId: 1,
        state: true
      },
      {
        id: 3,
        name: "TOTAL DEDUCTION",
        alias: 'total_deduction',
        description: 'TỔNG KHẤU TRỪ TRONG THÁNG',
        isGroup: true,
        isBasicFormula: true,
        formula: 'SUM',
        query: '*',
        groupBelongId: 1,
        state: true
      },
      {
        id: 4,
        name: "Cash advanced",
        alias: 'Cash_advanced',
        description: 'Tạm ứng công ty',
        isGroup: true,
        isBasicFormula: true,
        formula: 'SUM',
        query: '*',
        groupBelongId: 1,
        state: true
      },
      {
        id: 5,
        name: "Other deduction",
        alias: 'other_deduction',
        description: 'Giam tru khac',
        isGroup: true,
        isBasicFormula: true,
        formula: 'SUM',
        query: '*',
        groupBelongId: 1,
        state: true
      },
      {
        id: 6,
        name: "DERIVED SALARY",
        alias: 'derived_salary',
        description: 'Lương phát sinh',
        isGroup: true,
        isBasicFormula: true,
        formula: 'SUM',
        query: '*',
        groupBelongId: 2,
        state: true
      },
      {
        id: 7,
        name: "Derived base salary",
        alias: 'derived_base_salary',
        description: 'lương cố định',
        isGroup: false,
        isBasicFormula: true,
        formula: '10000000',
        query: '*',
        groupBelongId: 6,
        state: true
      },
      {
        id: 8,
        name: "Derived Bonus",
        alias: 'derived_bonus',
        description: 'Thưởng cố định',
        isGroup: false,
        isBasicFormula: true,
        formula: '5000000',
        query: '*',
        groupBelongId: 6,
        state: true
      },
      {
        id: 9,
        name: "OTHER INCOME WITH TAX",
        alias: 'other_income_with_tax',
        description: 'các khoản cộng thêm có thuế',
        isGroup: true,
        isBasicFormula: true,
        formula: 'SUM',
        query: '*',
        groupBelongId: 2,
        state: true
      },
      {
        id: 10,
        name: "OTHER INCOME WITHOUT TAX",
        alias: 'other_income_without_tax',
        description: 'các khoản cộng thêm không thuế',
        isGroup: true,
        isBasicFormula: true,
        formula: 'SUM',
        query: '*',
        groupBelongId: 2,
        state: true
      },
      {
        id: 11,
        name: "INSURANCE",
        alias: 'insurance',
        description: 'Bao hiem',
        isGroup: true,
        isBasicFormula: true,
        formula: 'SUM',
        query: '*',
        groupBelongId: 3,
        state: true
      },
      {
        id: 12,
        name: "Social Insurance",
        alias: 'social_insurance',
        description: 'bao hiem xa hoi',
        isGroup: false,
        isBasicFormula: true,
        formula: 'rid7 * 0.08',
        query: '*',
        groupBelongId: 11,
        state: true
      },
      {
        id: 13,
        name: "Health Insurance",
        alias: 'health_insurance',
        description: 'bao hiem suc khoe',
        isGroup: false,
        isBasicFormula: true,
        formula: 'rid7 * 0.015',
        query: '*',
        groupBelongId: 11,
        state: true
      },
      {
        id: 14,
        name: "Unemployment Insurance",
        alias: 'unemployment_insurance',
        description: 'bao hiem that nghiep',
        isGroup: false,
        isBasicFormula: true,
        formula: 'rid7 * 0.01',
        query: '*',
        groupBelongId: 11,
        state: true
      },
      {
        id: 15,
        name: "PERSONAL INCOME TAX",
        alias: 'personal_income_tax',
        description: 'Thue thu nhap ca nhan',
        isGroup: true,
        isBasicFormula: false,
        formula: 'SUM',
        query: '*',
        groupBelongId: 3,
        state: true
      },
      {
        id: 16,
        name: "Income not tax",
        alias: 'Income_not_tax',
        description: 'Khoan mien thue',
        isGroup: true,
        isBasicFormula: true,
        formula: 'SUM',
        query: '*',
        groupBelongId: 15,
        state: true
      },
      {
        id: 17,
        name: "Taxable income",
        alias: 'taxable_income',
        description: 'Thu nhap tinh thue',
        isGroup: false,
        isBasicFormula: true,
        formula: 'rid6 + rid9 - rid16',
        query: '*',
        groupBelongId: 15,
        state: true
      },
      {
        id: 18,
        name: "Meal allowance",
        alias: 'meal_allowance',
        description: 'Phu cap com trua',
        isGroup: false,
        isBasicFormula: true,
        formula: '990000',
        query: '*',
        groupBelongId: 9,
        state: true
      },
      {
        id: 19,
        name: "Meal allowance not tax",
        alias: 'meal_allowance_not_tax',
        description: 'Phu cap com trua khong tinh thue',
        isGroup: false,
        isBasicFormula: true,
        formula: '730000',
        query: '*',
        groupBelongId: 16,
        state: true
      },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('salary_rules', null, {});
  }
};
