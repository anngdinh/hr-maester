import styled from "styled-components";
import { Spreadsheet } from "react-spreadsheet";
import React, { useEffect, useState } from 'react';

import ensureRoomToGrow from "./utils/ensureRoomToGrow";
import ExpParser from "./utils/ExpParser";
import SpreadsheetExample from "./react-spreadsheet";
import InlineSheet from "./react-spreadsheet copy";
import ReactSpreadsheetDemo from "./react-spreadsheet copy 3";
import DataDemo from "./react-spreadsheet copy 2";

const emVar = "e";
const tableVar = "t";
const dataUserField = ["id", "name", "age", "born"];

const dataUser = [
    ["E1", "Annn", 21, 2001],
    ["E2", "Quan", 22, 2000]
];

let dataCal = ["nothing"];
let dataInSheetCal = [[{ value: "nothing" }]];

const SheetDemo = () => {

    const [dataInSheetAll, setDataInSheetAll] = useState([
        [{ value: "null" }, { value: "null" }],
        [{ value: "null" }, { value: "null" }],
        [{ value: null }]
    ]);

    const parseDataInSheetCal = () => {
        let data = [];
        for (let i = 0; i < dataCal.length; i++) {
            let row = [];
            for (let j = 0; j < dataCal[i].length; j++) {
                let cel = [{ value: dataCal[i][j], readOnly: true, className: "e.age/e.born" }];
                row = row.concat(cel);
            }
            data = data.concat([row]);
        }
        dataInSheetCal = data;
    };
    const updateDataInSheetAll = () => {
        let data = dataInSheetAll.slice(0, 3).concat(dataInSheetCal);
        setDataInSheetAll(ensureRoomToGrow(data));
    };
    const renderDataCal = () => {
        parseDataInSheetCal();
        updateDataInSheetAll();
    };
    useEffect(() => {
        function initDataCal() {
            let data = [];
            for (let i = 0; i < dataUser.length; i++) {
                let row = [dataUser[i][0], dataUser[i][1]];
                data = data.concat([row]);
            }
            dataCal = data;
        }

        initDataCal();
        console.log("dataCal: ", dataCal);

        renderDataCal();
    }, []);

    function updateDataCalOneValue(col, addData) {
        console.log("before", dataCal);
        if (typeof dataCal === "undefined") return;
        for (let i = 0; i < dataCal.length; i++) {
            if (typeof dataCal[i] === "undefined") return;
            while (dataCal[i].length <= col) {
                dataCal[i] = dataCal[i].concat([0]);
            }
            dataCal[i][col] = addData;
        }
        console.log("after", dataCal);
    }

    const onCellCommit = (prev, next, coords) => {
        // setData(ensureRoomToGrow(data));
        // try {
        let row = coords["row"]|| -1;
        let col = coords["column"]|| -1;
        let nextValue = next["value"];
        console.log('onCellCommit', { prev, nextValue }, { row, col });
        console.log('onCellCommit', { prev, next, coords });
        if (coords.row === 1 && coords.column >= 2) {
            console.log("dddaaa", dataCal);
            updateDataCal(col, nextValue);

            renderDataCal();
        }
        // } catch (error) {

        // }
    };

    const updateDataCal = (col, value) => {
        const exp = ExpParser(value);
        console.log("exp", exp);
        let formatString = {}
        if (Array.isArray(exp))
            for (let i = 0; i < exp.length; i++) {
                const element = exp[i].split(".");
                if (element[0] === emVar) {
                    formatString[exp[i]] = dataUserField.indexOf(element[1])
                }
                else if (element[0] === tableVar) {
                    formatString[exp[i]] = element[1];
                }
            }
        console.log("formatString", formatString)

        console.log("before", dataCal);
        if (typeof dataCal === "undefined") return;
        for (let i = 0; i < dataCal.length; i++) {
            if (typeof dataCal[i] === "undefined") return;
            while (dataCal[i].length <= col) {
                dataCal[i] = dataCal[i].concat([0]);
            }

            let newValue = value;
            if (Array.isArray(exp))
                for (let j = 0; j < exp.length; j++) {
                    const element = exp[j].split(".");
                    if (element[0] === emVar) {
                        newValue = newValue.replace(exp[j], dataUser[i][parseInt(formatString[exp[j]])].toString());
                    }
                    else if (element[0] === tableVar) {
                        newValue = newValue.replace(exp[j], formatString[exp[j]] + (i + 4).toString())
                    }
                }
            dataCal[i][col] = newValue[0] === "=" ? newValue : "=" + newValue;
        }
        console.log("after", dataCal);
    }


    const onChange = (data) => {
        // setData(ensureRoomToGrow(data));
        console.log("onChange", data);
        setDataInSheetAll(data);
    };
    const onSelect = (selected) => {
        console.log("onSelect", selected);
    };
    const onActivate = (active) => {
        console.log("onActivate", active);
    };
    const onBlur = () => {
        console.log("onBlur");
    };
    const onKeyDown = (event) => {
        console.log("onKeyDown", event);
    };
    const onModeChange = (mode) => {
        console.log("onModeChange", mode);
    };

    const RangeView = ({ cell }) => (
        <input
            type="text"
            value={cell}
            disabled
            style={{ pointerEvents: "none" }}
        />
    );

    return (
        <>
            <Spreadsheet
                data={dataInSheetAll}
                onChange={onChange}
                
                onCellCommit={onCellCommit}
                rowLabels={["Description", "Fomular"]}
                onSelect={onSelect}
                onActivate={onActivate}
                onBlur={onBlur}
                onKeyDown={onKeyDown}
                onModeChange={onModeChange}
                // getBindingsForCell
            />

            <h2>Raw Data</h2>
            <pre>{JSON.stringify(dataInSheetAll, null, "  ")}</pre>

            {/* <SpreadsheetExample></SpreadsheetExample> */}
            {/* <InlineSheet></InlineSheet> */}
            {/* <DataDemo></DataDemo> */}

            {/* <ReactSpreadsheetDemo></ReactSpreadsheetDemo> */}
        </>
    );
};



export default SheetDemo;

// e.age/e.born