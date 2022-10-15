import React from "react";
import Spreadsheet from "react-spreadsheet";

const RangeView = ({ cell }) => (
  <input
    type="range"
    value={cell.value}
    disabled
    style={{ pointerEvents: "none" }}
  />
);

const RangeEdit = ({ cell, onChange }) => (
  <input
    type="range"
    onChange={(e) => {
      onChange({ ...cell, value: e.target.value });
    }}
    value={cell.value || 0}
    autoFocus
  />
);

const data = [
  [{ value: "Flavors" }, { value: "hi" }],
  [({ value: "Vanilla" }, { value: "Chocolate" })],
  [{ value: "Strawberry" }, { value: "Cookies" }],
  [
    { value: "How much do you like ice cream?" },
    { value: 100, DataViewer: RangeView, DataEditor: RangeEdit }
  ]
];

const SpreadsheetExample = () => (
  <Spreadsheet
    data={data}
    onSelect={(selected) =>
    //   console.log("selected", selected)
      console.log(data[selected[0].row][selected[0].column])
    }
  />
);

export default SpreadsheetExample;

// https://codesandbox.io/s/9j98b?file=/src/components/spreadsheet.js:0-912