import styled from "styled-components";
import ReactDataSheet from 'react-datasheet';
import "react-datasheet/lib/react-datasheet.css";
import "./DataTableStyles.css";

import React, { useEffect, useState } from 'react';

import ensureRoomToGrow from "./utils/ensureRoomToGrow";
import ExpParser from "./utils/ExpParser";

const emVar = "e";
const tableVar = "t";
const dataUserField = ["id", "name", "age", "born"];

const dataUser = [
    ["E1", "Annn", 21, 2001],
    ["E2", "Quan", 22, 2000]
];

let dataCal = ["nothing"];
let dataInSheetCal = [[{ value: "nothing" }]];



const grid = [
    [{ value: 5, expr: '1 + 4' }, { value: 6, expr: 'A1 + 9' }, { value: new Date('2008-04-10') }],
    [{ value: 5, expr: '1 + 4' }, { value: 5, expr: '1 + 4' }, { value: new Date('2004-05-28') }]
]
const onCellsChanged = (changes) => changes.forEach(({ cell, row, col, value }) => console.log("New expression :" + value))


class ReactDataSheetDemo extends React.Component {

    render() {
        return (<ReactDataSheet
            data={grid}
            valueRenderer={(cell, i, j) => j == 2 ? cell.value.toDateString() : cell.value}
            dataRenderer={(cell, i, j) => j == 2 ? cell.value.toISOString() : cell.expr}
            onCellsChanged={onCellsChanged}
        />);
    }
}



export default ReactDataSheetDemo;