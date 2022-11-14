const HyperFormula = require('hyperformula');

// define the options
const options = {
    licenseKey: 'gpl-v3',
};

const allRule =
    [
        {
            "id": 1,
            "formula": "rid3 + 99",
            "groupBelongId": null,
        },
        {
            "id": 2,
            "formula": "100",
            "groupBelongId": 1,
        },
        {
            "id": 3,
            "formula": "SUM",
            "groupBelongId": 1,
        },
        // {
        //     "id": 4,
        //     "formula": "200",
        //     "groupBelongId": 3,
        // },
        // {
        //     "id": 5,
        //     "formula": "200",
        //     "groupBelongId": 3,
        // },
    ]

const employeeIdArr = ['E1', 'E2']

function calSalary() {
    return calEachRule(1)
}

function calEachRule(id) {
    const rule = allRule.filter(e => e.id === id)[0]
    console.log(rule)
    const formula = rule.formula.split(' ')
    console.log(formula)

    let formulaParser = [rule.formula, rule.formula]
    console.log(formulaParser)

    for (let index = 0; index < formula.length; index++) {
        const each = []
        if (formula[index] === "SUM") {
            const ruleChildren = allRule.filter(e => e.groupBelongId === id)

            let valueReplace = new Array(2).fill(0);
            if (ruleChildren.length != 0) {
                console.log({ ruleChildren })
                const calRuleChildren = ruleChildren.reduce((pre, cur) => pre.concat([calEachRule(cur.id)]), [])
                console.log({ calRuleChildren })
                valueReplace = sumArray(calRuleChildren)
                console.log({ valueReplace })
            }

            // replace valueReplace
            formulaParser.forEach((e, i) => formulaParser[i] = formulaParser[i].replace(formula[index], valueReplace[i]))
        }
        else if (formula[index].startsWith('rid')) {
            const id = parseInt(formula[index].slice(3))
            let valueReplace = calEachRule(id);

            // replace valueReplace
            formulaParser.forEach((e, i) => formulaParser[i] = formulaParser[i].replace(formula[index], valueReplace[i]))
        }
    }
    return HyperFormulaCal(formulaParser);
}

function sumArray(arr) {
    let parser = [];
    for (let i = 0; i < arr[0].length; i++) {
        let r = arr.slice(1).reduce((pre, cur) => pre + " + " + cur[i], arr[0][i])
        parser.push(r)
    }

    return HyperFormulaCal(parser);
}

function HyperFormulaCal(arr) {
    arr.forEach((e, i) => arr[i] = '=' + arr[i])
    const hfInstance = HyperFormula.HyperFormula.buildFromArray([arr], options);

    // call getCellValue to get the calculation results
    const mySum = hfInstance.getAllSheetsValues().Sheet1;

    // print the result in the browser's console
    console.log({ mySum });

    return mySum[0];
}

let total = calSalary()
console.log({ total })