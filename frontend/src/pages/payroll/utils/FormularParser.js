import { Parser as FormulaParser } from "hot-formula-parser";

const formulaParser = new FormulaParser();





formulaParser.setFunction('GET_EMPLOYEE', function (params) { // index i, j
    let x = dataUserField.indexOf(params[0]);
    // console.log(x)
    return dataUser[params[1]][x];
});

// var dataRender = new Array(numUser).fill(0).map(() => new Array(numFormular).fill(0)); //  numUser x n
var dataRender = new Array(numFormular).fill(0).map(() => new Array(numUser).fill(0)); //  numUser x n
// var dataRender = [[1, 1], [2, 2], [3, 3], [4, 4]]
console.log(dataRender)

const ColumnIndex = (col) => {
    let x = col.charCodeAt(0)
    // console.log(x);
    return x - 65;
}

formulaParser.setFunction('GET_TABLE', function (params) { // index i, j
    let x = ColumnIndex(params[0]);
    // console.log(x);
    return dataRender[x][params[1]];
});


/*
// Require express and create an instance of it
var express = require('express');
var FormulaParser = require('hot-formula-parser').Parser;
var parser = new FormulaParser();

const emVar = "e";
const tableVar = "t";
const indexHolder = "rwyywtyyyu";
const dataUserField = ["id", "name", "age", "born"];

const dataUser = [
    ["E1", "Annn", 21, 2001],
    ["E2", "Quan", 22, 2000]
];
// const _formular = ['e.age'];
const _formular = ['e.age', 'e.born', 't.A', 't.A / t.B + e.age'];

const numUser = dataUser.length
const numFormular = _formular.length


parser.setFunction('GET_EMPLOYEE', function (params) { // index i, j
    let x = dataUserField.indexOf(params[0]);
    // console.log(x)
    return dataUser[params[1]][x];
    return 1;
});

// var dataRender = new Array(numUser).fill(0).map(() => new Array(numFormular).fill(0)); //  numUser x n
var dataRender = new Array(numFormular).fill(0).map(() => new Array(numUser).fill(0)); //  numUser x n
// var dataRender = [[1, 1], [2, 2], [3, 3], [4, 4]]
console.log(dataRender)

const ColumnIndex = (col) => {
    let x = col.charCodeAt(0)
    // console.log(x);
    return x - 65;
}

parser.setFunction('GET_TABLE', function (params) { // index i, j
    let x = ColumnIndex(params[0]);
    // console.log(x);
    return dataRender[x][params[1]];
});


const pattern = /[_A-Za-z^]+\.[_A-Za-z^]+/g;

function ExpParser(exp) {
    let result = exp.match(pattern);
    console.log(result);
    return result;
}

var formularExtract = _formular.map(e => ExpParser(e))
console.log({ formularExtract })

var parserString = _formular.map((e, i) => {
    let parseElement = formularExtract[i].map((e) => {
        const element = e.split('.');
        // console.log({element})
        if (e[0] === emVar) return 'GET_EMPLOYEE("' + element[1] + '", ' + indexHolder + ")";
        else if (e[0] === tableVar) return 'GET_TABLE("' + element[1] + '", ' + indexHolder + ")";
    })
    // let f = formularExtract[i].redude((previousValue, currentValue) => previousValue.replace(currentValue, ...),
    // e)

    let f = e;

    for (let index = 0; index < formularExtract[i].length; index++) {
        f = f.replace(formularExtract[i][index], parseElement[index])
    }
    return f;
})

console.log({ parserString })

// dataRender = dataRender.map((e, i) => {
//     return e.map((k, j) => {
//         let x = parserString[i].replaceAll(indexHolder, j)
//         // console.log(parser.parse(x))
//         return parser.parse(x).result;
//     })
// })

for (let i = 0; i < dataRender.length; i++) {
    for (let j = 0; j < dataRender[i].length; j++) {
        let x = parserString[i].replaceAll(indexHolder, j)
        dataRender[i][j] = parser.parse(x).result;
    }
}

console.log({ dataRender })


// console.log(parser.parse('GET_TABLE("A", 0)+GET_TABLE("C", 0)'))
// console.log(parser.parse('GET_EMPLOYEE("age", 0)'))


// console.log(ColumnIndex('B'))


// // "GET_EMPLOYEE(2, " + index         GET_TABLE(A + index

// let soMany = 10;
// console.log(`This is ${soMany} times easier!
*/