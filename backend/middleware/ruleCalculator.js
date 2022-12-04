const export_payroll_monthly = require('../models').export_payroll_monthly;
const export_payroll_monthly_rule = require('../models').export_payroll_monthly_rule;
const export_payroll_monthly_preview = require('../models').export_payroll_monthly_preview;
const export_payroll_monthly_final = require('../models').export_payroll_monthly_final;
const Employee = require('../models').Employee;
const custom_field = require('../models').custom_field;
const custom_field_value = require('../models').custom_field_value;
const variable = require('../models').variable;
const salary_rule = require('../models').salary_rule;
const salary_rule_formula = require('../models').salary_rule_formula;

const HyperFormula = require('hyperformula');
const { Op } = require("sequelize");

const indexHolder = '_indexHolder_'

const prefixRule = 'rule.'
const prefixVar = 'var.'
const prefixField = 'field.'
const prefixTable = 'table.'

// const tableVarName = "tableVar"
const sheetFieldName = "sheetField" // custom_field = (normal, month) + rule
const sheetFieldRuleName = "sheetFieldRule"
const sheetRuleCalName = "sheetRuleCal"
// const tableTableName = "tableTable"


const allRule =
    [
        {
            "id": 1,
            "alias": 'one',
            "isBasicFormula": true,
            "formula": "rule.three + rule.two + field.field_in_rule + field.field_in_rule + field.coefficient_salary",
            "groupBelongId": null,
            // var : tax1=2, tax2=3
            // field: field_in_rule:  5 | 10
        },
        {
            "id": 2,
            "alias": 'two',
            "isBasicFormula": true,
            "formula": "2 * var.tax1 * var.tax2",
            "groupBelongId": 1,
            // var : tax1=4, tax2=5
        },
        {
            "id": 3,
            "alias": 'three',
            "isBasicFormula": false,
            "formula": "3",
            "groupBelongId": 1,
            // fomula: 200 | table.A + 100
        },
    ]
// coefficient_salary:   normal      2|3
// position          :   normal     10|
// working_day       :   monthly    20|30
async function calPayrollId(id) {

    const rootRuleID = 1;

    const _payroll = await export_payroll_monthly.findAll({ where: { id: id } });
    const payroll = _payroll[0].toJSON()

    // console.log({ payroll }) // id and month

    // const _ruleInfo = await salary_rule.findAll();
    // const ruleInfo = _ruleInfo.map((e) => e.toJSON())
    const ruleInfo = allRule;

    const _arrRuleChoose = await export_payroll_monthly_rule.findAll({ where: { export_payroll_monthly_id: payroll.id } })
    const arrRuleChoose = _arrRuleChoose.map((e) => e.toJSON().salary_rule_id)

    const _employeeID = await Employee.findAll({ attributes: ['id'] });
    const employeeID = _employeeID.map((e) => e.toJSON().id)
    // const recal
    // console.log({ employeeID })
    // console.log({ employeeID })

    const [custom_field_alias, custom_field_table] = await getCustomField(employeeID, {
        [Op.or]: [
            { type: 'normal' },
            {
                type: 'monthly',
                value: '202212'
            }
        ]
    })

    let arrRuleResult = new Array(arrRuleChoose.length).fill(0);
    const data = {
        payroll: payroll,
        arrRuleChoose: arrRuleChoose,
        arrRuleResult: arrRuleResult,
        ruleInfo: ruleInfo,
        custom_field_alias: custom_field_alias,
        custom_field_table: custom_field_table,
        employeeID: employeeID,
    }

    // console.log({ data })

    let result = await calRule(rootRuleID, data)
    console.log({ result })
    // console.log(data.arrRuleResult)
    // await writeToDatabase(data)
}

async function writeToDatabase(data) {
    const payrollID = data.payroll.id;
    await export_payroll_monthly_preview.destroy({
        where: {
            export_payroll_monthly_id: payrollID
        }
    })
    for (let i = 0; i < data.arrRuleResult.length; i++) {
        const element = data.arrRuleResult[i];
        if (element == 0) continue;
        else {
            for (let j = 0; j < element.length; j++) {
                const value = element[j];
                const ruleID = data.arrRuleChoose[i]
                const employeeID = data.employeeID[j]
                await export_payroll_monthly_preview.create({
                    export_payroll_monthly_id: payrollID,
                    salary_rule_id: ruleID,
                    employee_id: employeeID,
                    value: value,
                    isModified: false,
                    newValue: -1
                })
            }
        }
    }
}
async function calRule(ruleID, data) {
    // ............................. get variable and ...
    const _varTable = await variable.findAll({ where: { rule_id: ruleID } })
    const varTable = _varTable.map((e) => e.toJSON())
    const varAlias = varTable.map((e) => e.alias)
    const varValue = varTable.map((e) => e.value)
    // console.log({ varAlias, varValue })

    // get field in rule because it's local for rule, can't merge with normal and monthly
    const [custom_field_rule_alias, custom_field_rule_table] = await getCustomField(data.employeeID, { type: 'salary', value: 1 })
    console.log({ custom_field_rule_alias, custom_field_rule_table })

    const hfInstance = HyperFormula.HyperFormula.buildEmpty({ licenseKey: 'gpl-v3' });
    hfInstance.setSheetContent(hfInstance.getSheetId(hfInstance.addSheet(sheetFieldRuleName)), custom_field_rule_table);
    hfInstance.setSheetContent(hfInstance.getSheetId(hfInstance.addSheet(sheetFieldName)), data.custom_field_table);

    const ruleResultID = hfInstance.getSheetId(hfInstance.addSheet(sheetRuleCalName));
    const rule = data.ruleInfo.find((e) => e.id == ruleID)
    // console.log({ rule })

    let dataLocal = {}
    dataLocal.varAlias = varAlias
    // dataLocal.varTable = varTable
    dataLocal.varValue = varValue
    dataLocal.custom_field_rule_alias = custom_field_rule_alias
    dataLocal.ruleID = ruleID
    dataLocal.ruleResultID = ruleResultID
    // dataLocal.custom_field_rule_table = custom_field_rule_table
    dataLocal.hfInstance = hfInstance

    if (rule.isBasicFormula) {
        const result = await calFormula([rule.formula], dataLocal, data)
        return result[0]
    }
    else {
        const _formula = await salary_rule_formula.findAll(
            {
                where: { salary_rule_id: ruleID },
                order: [["column_id", "ASC"]] // ASC, DESC, NULLS FIRST
            })
        const formularArr = _formula.map((e) => e.toJSON().value)
        console.log({ formularArr })

        const result = await calFormula(formularArr, dataLocal, data)
        return result[result.length - 1]
    }
}

async function calFormula(formula, dataLocal, data) { // ["", ""]
    let hfInstance = dataLocal.hfInstance
    // var formularExtract = formula.map(e => ExpParser(e))
    let tableResult = []
    for (let i = 0; i < formula.length; i++) {
        const formulaSplit = splitFomula(formula[i])
        let formulaParser = formulaSplit;

        let columnResult = []

        // field and var and table
        for (let index = 0; index < formulaSplit.length; index++) {
            if (formulaSplit[index].startsWith(prefixField)) {
                const alias = formulaSplit[index].slice(prefixField.length)

                // in custom_field_alias       or      custom_field_rule_alias
                if (dataLocal.custom_field_rule_alias.indexOf(alias) != -1) {
                    const aliasIndex = dataLocal.custom_field_rule_alias.indexOf(alias)
                    const charIndex = IntToABCD(aliasIndex)
                    formulaParser[index] = `${sheetFieldRuleName}!${charIndex}${indexHolder}`
                    // formulaParser[index] = "0"
                }
                else {
                    const aliasIndex = data.custom_field_alias.indexOf(alias)
                    const charIndex = IntToABCD(aliasIndex)
                    formulaParser[index] = `${sheetFieldName}!${charIndex}${indexHolder}`
                }
            }
            else if (formulaSplit[index].startsWith(prefixVar)) {
                const alias = formulaSplit[index].slice(prefixVar.length)
                const aliasIndex = dataLocal.varAlias.indexOf(alias)
                formulaParser[index] = dataLocal.varValue[aliasIndex]
            }
            else if (formulaSplit[index].startsWith(prefixTable)) {
                const alias = formulaSplit[index].slice(prefixTable.length)
                formulaParser[index] = `${sheetRuleCalName}!${alias}${indexHolder}`
                // formulaParser[index] = `sheetRuleCal!A1`
            }
        }

        columnResult = new Array(data.employeeID.length).fill(0);
        columnResult.forEach((_, ind) => columnResult[ind] = clone(formulaParser));

        // rule
        for (let index = 0; index < formulaSplit.length; index++) {
            if (formulaSplit[index].startsWith(prefixRule)) {
                const alias = formulaSplit[index].slice(prefixRule.length)
                let id = data.ruleInfo.find((e) => e.alias == alias).id
                let valueReplace = []
                if (data.arrRuleChoose.indexOf(id) != -1 && data.arrRuleResult[data.arrRuleChoose.indexOf(id)] != 0) { // default is 0, if it calculated is []
                    valueReplace = data.arrRuleResult[data.arrRuleChoose.indexOf(id)]
                }
                else {
                    valueReplace = await calRule(id, data);
                }

                console.log({ valueReplace })

                // replace valueReplace
                valueReplace.forEach((e, i) => columnResult[i][index] = e.toString())
            }
        }

        // console.log({ columnResult })

        // concat columnResult
        columnResult = columnResult.map((e, index) => {
            let str = e.join('')
            str = str.replaceAll(indexHolder, index + 1)
            return "= " + str
        })
        // console.log({ columnResult })


        tableResult = tableResult.concat([columnResult])
    }

    console.log({ tableResult })
    console.log(transposeArr(tableResult))

    hfInstance.setSheetContent(dataLocal.ruleResultID, transposeArr(tableResult));
    const sheetValue = hfInstance.getSheetValues(dataLocal.ruleResultID)
    console.log({ sheetValue })

    // data.arrRuleResult[data.arrRuleChoose.indexOf(dataLocal.ruleID)] = sheetValue[sheetValue.length - 1]
    // return sheetValue[0]
    // return sheetValue;
    return transposeArr(sheetValue);
}

function splitFomula(formula) {
    return formula.split(' ');
}

async function getCustomField(employeeID, options) {
    const _custom_field = await custom_field.findAll({
        where: options,
        attributes: ['id', 'alias']
    })
    const custom_field_id = _custom_field.map((e) => e.toJSON().id)
    const custom_field_alias = _custom_field.map((e) => e.toJSON().alias)

    let custom_field_table = []
    for (const field of custom_field_id) {
        const _value = await custom_field_value.findAll({ where: { custom_field_id: field } })
        // console.log({ _value })

        const value = _value.map((e) => e.toJSON())
        // console.log({ value })

        let custom_value = new Array(employeeID.length).fill(0);
        value.forEach(element => {
            const ind = employeeID.findIndex((e) => e == element.employeeId)
            custom_value[ind] = element.value //......................
        });
        // console.log({ custom_value })

        custom_field_table = custom_field_table.concat([custom_value]);
    }

    // console.log({ custom_field_table })
    // console.log(transposeArr(custom_field_table))
    // console.log({ _custom_field_id })
    // console.log({ custom_field_id })

    return [custom_field_alias, transposeArr(custom_field_table)]
}


function transposeArr(arr) {
    let output = arr[0].map((_, colIndex) => arr.map(row => row[colIndex]));
    // return math.inv(arr);
    return output;
}

const IntToABCD = (i) => {
    return String.fromCharCode(i + 65)
}

const clone = (arr) => arr.map((e) => e)


const pattern = /[_A-Za-z^]+\.[_A-Za-z^]+/g;
function ExpParser(exp) {
    let result = exp.match(pattern);
    // console.log(result);
    return result;
}

module.exports = calPayrollId;