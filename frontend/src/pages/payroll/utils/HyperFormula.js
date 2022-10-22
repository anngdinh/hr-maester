// import { HyperFormula } from 'hyperformula';
const pattern = /[_A-Za-z^]+\.[_A-Za-z^]+/g;

function ExpParser(exp) {
    let result = exp.match(pattern);
    // console.log(result);
    return result;
}


var HyperFormula = require('hyperformula').HyperFormula;
var _ = require('lodash');


// initiate the engine with no data
const hfInstance = HyperFormula.buildEmpty({ licenseKey: 'gpl-v3' });


const emVar = "e";
const tableVar = "t";
const indexHolder = "random_string_for_replace";
const valueError = ['#ERROR!', '#DIV/0!', '#NAME?', '#N/A', '#NUM!', '#VALUE!']

const dataUser = [
    ["E1", "Annn", 21, 2001],
    ["E2", "Quan", 22, 2000]
];
const dataUserField = ['id', 'name', 'age', 'born'];
const formularArr = ['=e.age', '=e.born', '=t.A', '=t.A * t.B '];
const numFormular = formularArr.length;
const numUser = dataUser.length;

// add 'TeamA' sheet
const employeeSheetName = hfInstance.addSheet('EMPLOYEE_TABLE');
// get the new sheet ID for further API calls
const employeeSheetId = hfInstance.getSheetId(employeeSheetName);
// insert playersA content into targeted 'TeamA' sheet
hfInstance.setSheetContent(employeeSheetId, dataUser);


let dataArr = [
    ['=EMPLOYEE_TABLE!C1 + EMPLOYEE_TABLE!D1', 0],
    ['=A1', 0],
    [0, 0],
    [0, 0]
];


// add 'TeamA' sheet
const tableSheetName = hfInstance.addSheet('TABLE_TABLE');
// get the new sheet ID for further API calls
const tableSheetId = hfInstance.getSheetId(tableSheetName);
// insert playersA content into targeted 'TeamA' sheet
let a = hfInstance.setSheetContent(tableSheetId, dataArr);




let _formularArr = _.cloneDeep(formularArr)

var formularExtract = _formularArr.map(e => ExpParser(e))
console.log({ formularExtract })


function UserFieldToChar(userField) {
    let j = dataUserField.indexOf(userField)
    return String.fromCharCode(j + 65)
}


var parserString = _formularArr.map((e, i) => {
    let parseElement = formularExtract[i]?.map((e) => {
        const element = e.split('.');
        // console.log({element})
        if (e[0] === emVar) return 'EMPLOYEE_TABLE!' + UserFieldToChar(element[1]) + indexHolder;
        else if (e[0] === tableVar) return 'TABLE_TABLE!' + element[1] + indexHolder;
    })
    let f = e;

    for (let index = 0; formularExtract[i] !== null && index < formularExtract[i].length; index++) {
        f = f.replace(formularExtract[i][index], parseElement[index])
    }
    return f;
})
console.log({ parserString })


let _dataArr = _.cloneDeep(dataArr)

for (let i = 0; i < _dataArr.length; i++) {
    for (let j = 0; j < _dataArr[i].length; j++) {
        let x = parserString[i].replaceAll(indexHolder, j + 1)
        // let y = formulaParser.parse(x);
        // console.log(parserString[i])
        // console.log(parserString[i])
        // console.log({ x, y })
        _dataArr[i][j] = x;
        // setDataArr(_dataArr)
    }
}

console.log({ _dataArr })

// a = haha

hfInstance.setSheetContent(tableSheetId, _dataArr);


// const functionName = hfInstance.Fun

// HyperFormula.registerFunction()

// console.log(dataArr)

// check the content in the console output
console.log(hfInstance.getAllSheetsValues());