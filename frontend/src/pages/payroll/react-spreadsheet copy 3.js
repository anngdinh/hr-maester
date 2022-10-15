import styled from "styled-components";
import { Spreadsheet } from "react-spreadsheet";
import React, { useEffect, useState } from 'react';
import _, { set } from "lodash";
import { Select, Input, Button, Checkbox } from "antd";

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
  const TextEdit = ({ getValue, cell, onChange }) => (
    <Input
      onChange={e => {
        onChange({ ...cell, value: "e.target.value" });
        console.log({ cell })
      }}
      // value={() => getValue({ data: cell })}
      autoFocus
    />
  );

  const addEmptyColumn = (data) => {
    let dataCp = data;
    dataCp = dataCp.map(e => e.concat([{ value: "haha", DataEditor: TextEdit }]))
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


  const onCellCommit = (prev, next, coords) => {
    
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

        // onCellCommit={onCellCommit}
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