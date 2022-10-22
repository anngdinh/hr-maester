// const valueError = ['#ERROR!', '#DIV/0!', '#NAME?', '#N/A', '#NUM!', '#VALUE!']
const valueError = ['#ERROR!', '#DIV/0!', '#NAME?', '#N/A', '#NUM!', '#VALUE!', '#REF!', '#CYCLE!', '#LIC!']

const emVar = "e";
const tableVar = "t";
const indexHolder = "random_string_for_replace";

const [employeeTableName, tableTableName] = ['EMPLOYEE_TABLE', 'TABLE_TABLE']

function getDataColumn(dataArr, index) {
    return dataArr.map((e) => e[index])
}

export { valueError, emVar, tableVar, indexHolder, employeeTableName, tableTableName, getDataColumn };