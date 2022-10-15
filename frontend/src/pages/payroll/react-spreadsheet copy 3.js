import styled from "styled-components";
import { Spreadsheet } from "react-spreadsheet";
import React, { useEffect, useState } from 'react';
import _, { set } from "lodash";

import ensureRoomToGrow from "./utils/ensureRoomToGrow";
import ExpParser from "./utils/ExpParser";

const emVar = "e";
const tableVar = "t";
const dataUserField = ["id", "name", "age", "born"];

const dataUser = [
  ["E1", "Annn", 21, 2001],
  ["E2", "Quan", 22, 2000]
];

// let dataCal = ["nothing"];
// let dataInSheetCal = [[{ value: "nothing" }]];

const ReactSpreadsheetDemo = () => {

  const [dataInSheetAll, setDataInSheetAll] = useState([
    [{ value: "_", readOnly: true }, { value: "Description", readOnly: true }],
    [{ value: "_", readOnly: true }, { value: "Formular", readOnly: true }],
    [{ value: null, readOnly: true }, { value: null, readOnly: true }]
  ]);

  const [quan, setQuan] = useState(false);

  const parseDataInSheetCal = (dataCal) => {
    let data = [];
    for (let i = 0; i < dataCal.length; i++) {
      let row = [];
      for (let j = 0; j < dataCal[i].length; j++) {
        let cel = [{ value: dataCal[i][j], readOnly: true, className: "e.age/e.born" }];
        row = row.concat(cel);
      }
      data = data.concat([row]);
    }
    return data;
  };
  const updateDataInSheetAll = () => {
    let data = dataInSheetAll.slice(0, 3).concat(dataInSheetCal);
    setDataInSheetAll(ensureRoomToGrow(data));
  };
  const renderDataCal = () => {
    parseDataInSheetCal();
    updateDataInSheetAll();
  };
  const addEmptyColumn = (data) => {
    let dataCp = data;
    dataCp = dataCp.map(e => e.concat([{ value: "haha" }]))
    return dataCp;
  }
  useEffect(() => {
    function initDataCal() {
      let data = [];
      for (let i = 0; i < dataUser.length; i++) {
        let row = [dataUser[i][0], dataUser[i][1]];
        data = data.concat([row]);
      }
      return data;
    }

    let dataInit = initDataCal();
    dataInit = parseDataInSheetCal(dataInit);
    dataInit = dataInSheetAll.concat(dataInit);
    // dataInit = ensureRoomToGrow(dataInit)
    dataInit = addEmptyColumn(dataInit)
    console.log("dataInit: ", dataInit);
    setDataInSheetAll(dataInit);
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
    setQuan(!quan)
    console.log({quan})
    if (coords === null || !coords.hasOwnProperty('row') || !coords.hasOwnProperty('column'))
      return;
    let row = parseInt(coords["row"]);
    let col = parseInt(coords["column"]);
    let nextValue = next["value"];
    console.log('onCellCommit', { prev, nextValue }, { row, col });

    // For sure data not update (state and viewer) if user input wrong cell
    
    // if (row >= 2) {
    //   let dataCp = _.cloneDeep(dataInSheetAll);
    //   setDataInSheetAll(dataCp);
    //   return;
    // }

    let dataCp = _.cloneDeep(dataInSheetAll);
    dataCp[row + 1][col].value = nextValue;
    // // dataCp[row + 1][col]['value'] = nextValue;
    // dataCp = addEmptyColumn(dataCp);
    setDataInSheetAll(dataCp);
    // console.log('onCellCommit', { prev, next, coords });
    // if (coords.row === 1 && coords.column >= 2) {
    //   console.log("dddaaa", dataCal);
    //   updateDataCal(col, nextValue);

    //   renderDataCal();
    // }
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
    // setDataInSheetAll(data);
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



  return (
    <>
      <Spreadsheet
        data={dataInSheetAll}
        onChange={onChange}

        onCellCommit={onCellCommit}
        // onCellCommit
        // rowLabels={["Description", "Fomular"]}
        hideRowIndicators={true}
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
    </>
  );
};



export default ReactSpreadsheetDemo;

// e.age/e.born