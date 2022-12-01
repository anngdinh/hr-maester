const { salary_rule } = require("../models");
const export_payroll_monthly = require('../models').export_payroll_monthly;
const export_payroll_monthly_rule = require('../models').export_payroll_monthly_rule;
const export_payroll_monthly_preview = require('../models').export_payroll_monthly_preview;
const export_payroll_monthly_final = require('../models').export_payroll_monthly_final;
const Employee = require('../models').Employee;
const custom_field = require('../models').custom_field;
const custom_field_value = require('../models').custom_field_value;


async function dataGridPayroll(id) {
    let columns = []
    let rows = []

    const _rules = await export_payroll_monthly_rule.findAll({ where: { export_payroll_monthly_id: id, }, });
    const __rules = _rules.map((e) => e.dataValues.salary_rule_id)
    const rules = await salary_rule.findAll({
        where: {
            id: __rules
        }
    })

    columns = rules.map((e) => ({
        field: e.alias,
        headerName: e.alias,
        editable: true
    }))
    const initColumns = [
        { field: 'employeeId', headerName: "ID", editable: false },
        { field: 'name', headerName: "Name", editable: false },
    ]
    columns = initColumns.concat(columns);


    const _preview = await export_payroll_monthly_preview.findAll({
        where: { export_payroll_monthly_id: id, },
        attributes: ['salary_rule_id', 'employee_id', 'value', 'isModified', 'newValue']
    });

    const allRule = await salary_rule.findAll();

    // console.log({_preview})
    const employee = await Employee.findAll();
    rows = employee.map((e) => {
        let arr = _preview.filter((ele) => ele.dataValues["employee_id"] == e.dataValues.id)
        // console.log({ arr })
        let result = { id: e.dataValues.id }
        result["employeeId"] = e.dataValues.id
        result["name"] = e.dataValues.lastName
        arr.forEach((ele) => {
            const alias = getAliasFromId(allRule, ele.dataValues["salary_rule_id"])
            // console.log(ele.dataValues["salary_rule_id"])
            // console.log({ alias })
            result[alias] = ele.dataValues["value"]
        })

        return result
    })


    return [rules, rows, columns]
}

const getIdFromAlias = (arr, alias) => {
    let x = arr.find((e) => e.dataValues.alias == alias)
    return x.id;
}

const getAliasFromId = (arr, id) => {
    let x = arr.find((e) => e.dataValues.id == id)
    // console.log({ id, x })
    return x.alias;
}


module.exports = dataGridPayroll;