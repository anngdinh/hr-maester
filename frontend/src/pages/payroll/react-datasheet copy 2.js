import styled from "styled-components";
import ReactDataSheet from 'react-datasheet';
import "react-datasheet/lib/react-datasheet.css";
import "./DataTableStyles.css";

import _ from 'lodash'

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



let formularSheet = [
    [{ value: 5, expr: '1 + 7' }, { value: 6, expr: 'A1 + 9' }, { value: '2008-04-10' }],
    [{ value: 5, expr: '1 + 7' }, { value: 6, expr: 'A1 + 9' }, { value: '2008-04-10' }],
    [{ value: 5, expr: '1 + 4' }, { value: 5, expr: '1 + 4' }, { value: '2004-05-28' }],
    [{ value: null }]
]

let dataSheet = [
    [{ value: 5 }, { value: 6 }, { value: '2008-04-10' }],
    [{ value: 5 }, { value: 6 }, { value: '2008-04-10' }],
    [{ value: 5 }, { value: 5 }, { value: '2004-05-28' }],
    [{ value: null }]
];



const ReactDataSheetDemo = () => {
    // const [dataSheet, setDataSheet] = useState([
    //     [{ value: 5 }, { value: 6 }, { value: '2008-04-10' }],
    //     [{ value: 5 }, { value: 6 }, { value: '2008-04-10' }],
    //     [{ value: 5 }, { value: 5 }, { value: '2004-05-28' }],
    //     [{ value: null }]
    // ]);

    const onCellsChanged = (changes) => {
        changes.forEach(({ cell, row, col, value }) => {
            console.log("New expression :", cell, row, col, value);
            cell.value = "modify";
            // grid[2][col] = { ...grid[1][col], value }
            // dataSheet.map(x => {
            //     x[col] = value;
            // })

            // let newDataSheet = dataSheet;
            // newDataSheet[row][col].value = value;
            // setDataSheet(newDataSheet)
            _.assign(dataSheet[row][col], { value: value });

            // dataSheet[row][col].value = value;
            // console.log("formularSheet", formularSheet)
            // console.log("dataSheet", dataSheet)
        });
    }

    return (
        <>
            <h3>Coong thuwcs</h3>
            <ReactDataSheet
                data={formularSheet}
                valueRenderer={(cell, i, j) => cell.value}
                onCellsChanged={onCellsChanged}
            // rowRenderer={props => (
            //     <tr>
            //         <td className='action-cell'>
            //             <input
            //                 type='checkbox'
            //                 checked={true}
            //                 // onChange={selectHandler}
            //             />
            //         </td>
            //         {props.children}
            //     </tr>
            // )}
            />
            <h3>ket qua</h3>

            <ReactDataSheet
                data={dataSheet}
                valueRenderer={(cell, i, j) => cell.value}
                onChange={(cell, i, j, value) => (dataSheet[i][j].value = value)}
            // valueV
            // dataRenderer={(cell, i, j) => cell.value}
            // onCellsChanged={onCellsChanged}
            />

            <h2>Raw Data</h2>
            <pre>{JSON.stringify(formularSheet, null, "  ")}</pre>
        </>
    );
}



export default ReactDataSheetDemo;