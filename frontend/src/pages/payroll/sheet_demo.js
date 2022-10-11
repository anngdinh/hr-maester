import styled from "styled-components";
import { Spreadsheet } from "react-spreadsheet";
import React, { useEffect, useState } from 'react';

import ensureRoomToGrow from "./utils/ensureRoomToGrow";

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
    /*
        At start:
        - get dataUser, dataUserField from API ave 10/20/30 user
        - set dataInSheet have 2 column : id and name
        */

    const parseDataInSheetCal = () => {
        let data = [];
        for (let i = 0; i < dataCal.length; i++) {
            let row = [];
            for (let j = 0; j < dataCal[i].length; j++) {
                let cel = [{ value: dataCal[i][j] }];
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
        let row = coords["row"];
        let col = coords["column"];
        let nextValue = next["value"];
        console.log('onCellCommit', { prev, nextValue }, { row, col });
        if (coords.row === 1 && coords.column >= 2) {
            console.log("dddaaa", dataCal);
            updateDataCalOneValue(col, nextValue);
            renderDataCal();
        }
        // console.log(dataInSheetAll);
    };

    const onChange = (data) => {
        // setData(ensureRoomToGrow(data));
        setDataInSheetAll(data);
    };

    return (
        <>
            <Spreadsheet
                data={dataInSheetAll}
                onChange={onChange}
                onCellCommit={onCellCommit}
                rowLabels={["Description", "Fomular"]}
            />

            <h2>Raw Data</h2>
            <pre>{JSON.stringify(dataInSheetAll, null, "  ")}</pre>
        </>
    );
};



export default SheetDemo;