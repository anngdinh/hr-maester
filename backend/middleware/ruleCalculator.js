const export_payroll_monthly = require('../models').export_payroll_monthly;
const export_payroll_monthly_rule = require('../models').export_payroll_monthly_rule;
const export_payroll_monthly_preview = require('../models').export_payroll_monthly_preview;
const export_payroll_monthly_final = require('../models').export_payroll_monthly_final;
const Employee = require('../models').Employee;
const custom_field = require('../models').custom_field;
const custom_field_value = require('../models').custom_field_value;

const HyperFormula = require('hyperformula');

const indexHolder = '_indexHolder_'

const prefixRule = 'rule.'
const prefixVar = 'var.'
const prefixField = 'field.'

const tableVarName = "tableVar"
const tableFieldName = "tableField"

// define the options

const allRule =
    [
        {
            "id": 1,
            "alias": 'one',
            "isBasicFormula": true,
            "formula": "rule.two + rule.three * 2",
            "groupBelongId": null,
        },
        {
            "id": 2,
            "alias": 'two',
            "isBasicFormula": true,
            "formula": "field.position * 100",
            "groupBelongId": 1,
        },
        {
            "id": 3,
            "alias": 'three',
            "isBasicFormula": true,
            "formula": "rule.two + field.coefficient_salary * 100",
            "groupBelongId": 1,
        },
    ]


const customTable = "customTable"
const salary_rule = require('../models').salary_rule;


async function calPayrollId(id) {
    const hfInstance = HyperFormula.HyperFormula.buildEmpty({ licenseKey: 'gpl-v3' });
    const ruleResultID = hfInstance.getSheetId(hfInstance.addSheet("RuleResultTable"));

    const rootRuleID = 1;

    const _payroll = await export_payroll_monthly.findAll({ where: { id: id } });
    const payroll = _payroll[0].toJSON()

    // console.log({ payroll }) // id and month

    const _ruleInfo = await salary_rule.findAll();
    const ruleInfo = _ruleInfo.map((e) => e.toJSON())
    // const ruleInfo = allRule;

    const _arrRuleChoose = await export_payroll_monthly_rule.findAll({ where: { export_payroll_monthly_id: payroll.id } })
    const arrRuleChoose = _arrRuleChoose.map((e) => e.toJSON().salary_rule_id)

    const _employeeID = await Employee.findAll({ attributes: ['id'] });
    const employeeID = _employeeID.map((e) => e.toJSON().id)
    // const recal
    // console.log({ employeeID })
    // console.log({ employeeID })

    const [custom_field_alias, custom_field_table] = await getCustomField(employeeID, '202206')

    hfInstance.setSheetContent(hfInstance.getSheetId(hfInstance.addSheet(tableFieldName)), custom_field_table);

    let arrRuleResult = new Array(arrRuleChoose.length).fill(0);
    const data = {
        payroll: payroll,
        arrRuleChoose: arrRuleChoose,
        arrRuleResult: arrRuleResult,
        ruleInfo: ruleInfo,
        custom_field_alias: custom_field_alias,
        custom_field_table: custom_field_table,
        employeeID: employeeID,
        hfInstance: hfInstance,
        ruleResultID: ruleResultID
    }

    // console.log({ data })

    let result = await calRule(rootRuleID, data)
    console.log({ result })
    console.log(data.arrRuleResult)
    await writeToDatabase(data)
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
    console.log("huhuhuh")
    // ............................. get variable table and ...
    const rule = data.ruleInfo.find((e) => e.id == ruleID)
    // console.log({ rule })

    if (rule.isBasicFormula) {
        const formulaSplit = splitFomula(rule.formula)
        // console.log(formulaSplit)
        let formulaParser = formulaSplit;

        let tableResult = []

        // field and var
        for (let index = 0; index < formulaSplit.length; index++) {
            if (formulaSplit[index].startsWith(prefixField)) {
                const alias = formulaSplit[index].slice(prefixField.length)

                const aliasIndex = data.custom_field_alias.indexOf(alias)
                const charIndex = IntToABCD(aliasIndex)

                formulaParser[index] = `${tableFieldName}!${charIndex}${indexHolder}`
            }
            else if (formulaSplit[index].startsWith(prefixVar)) { }
        }

        // console.log({ formulaParser })

        tableResult = new Array(data.employeeID.length).fill(0);
        tableResult.forEach((_, ind) => tableResult[ind] = clone(formulaParser));

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

                // replace valueReplace
                valueReplace.forEach((e, i) => tableResult[i][index] = e.toString())
            }
        }

        // console.log({ tableResult })

        // concat tableResult
        tableResult = tableResult.map((e, index) => {
            let str = e.join('')
            str = str.replaceAll(indexHolder, index + 1)
            return "= " + str
        })
        // console.log({ tableResult })

        data.hfInstance.setSheetContent(data.ruleResultID, [tableResult]);
        const sheetValue = data.hfInstance.getSheetValues(data.ruleResultID)

        data.arrRuleResult[data.arrRuleChoose.indexOf(ruleID)] = sheetValue[0]
        return sheetValue[0]
    }

    let formulaParser = [rule.formula, rule.formula]
    // console.log(formulaParser)

    return HyperFormulaCal(formulaParser);
}
function splitFomula(formula) {
    return formula.split(' ');
}
async function getCustomField(employeeID, month) {
    const _custom_field = await custom_field.findAll({
        where: {
            type: 'normal' // get monthly too ...................
        },
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



module.exports = calPayrollId;