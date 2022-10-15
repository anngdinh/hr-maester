import React from "react";
import Spreadsheet from "react-spreadsheet";
import { Select, Input, Button, Checkbox } from "antd";

const Option = Select.Option;

const TextEdit = ({ getValue, cell, onChange }) => (
  <Input
    onChange={e => {
      onChange({ ...cell, value: e.target.value });
      console.log({e})
    }}
    // value={() => getValue({ data: cell }) || ""}
    autoFocus
  />
);

const RowSelect = ({ getValue, cell, onChange }) => (
  <Checkbox disabled value={() => getValue({ data: cell }) || false} autoFocus />
);

const RowAction = ({ getValue, cell, onChange }) => (
  <Button autoFocus>...</Button>
);

const RowEdit = ({ getValue, cell, onCheck }) => (
  <Checkbox
    onCheck={e => {
      onCheck({ ...cell, value: e.target.checked });
    }}
    value={() => getValue({ data: cell }) || false}
    autoFocus
  />
);

const SelectEdit = ({ getValue, cell, onChange }) => {
  const handleChange = value => {
    onChange({ ...cell, value: value });
  };
  return (
    <Select
      autoFocus
      style={{ width: "100%" }}
      onChange={handleChange}
      defaultValue={() => getValue({ data: cell }) || ""}
    >
      <Option value="jack">Jack</Option>
      <Option value="lucy">Lucy</Option>
      <Option value="disabled" disabled>
        Disabled
      </Option>
      <Option value="Yiminghe">yiminghe</Option>
    </Select>
  );
};

const addRow = () => {
  console.log("add row");
};

const columnLabels = ["check", "Actions", "Text", "Select"];

const data = [
  [
    { value: null, DataViewer: RowSelect, DataEditor: RowEdit },
    { DataViewer: RowAction },
    { value: "Flavors", DataEditor: TextEdit },
    { value: "Jack", DataEditor: SelectEdit }
  ],
  [
    { value: null, DataViewer: RowSelect, DataEditor: RowEdit },
    { DataViewer: RowAction, DataEditor: null },
    { value: "Vanilla", DataEditor: TextEdit },
    { value: "", DataEditor: SelectEdit }
  ],
  [
    { value: null, DataViewer: RowSelect, DataEditor: RowEdit },
    { DataViewer: RowAction },
    { value: "Strawberry", DataEditor: TextEdit },
    { value: "", DataEditor: SelectEdit }
  ],
  [
    { value: null, DataViewer: RowSelect, DataEditor: RowEdit },
    { DataViewer: RowAction },
    { value: "Vanilla", DataEditor: TextEdit },
    { value: "Lucy", DataEditor: SelectEdit }
  ]
];

const InlineSheet = () => (
  <>
    {/*  <Button onClick={addRow}>Add row</Button> */}
    <Spreadsheet tabIndex={8} data={data} columnLabels={columnLabels} />
    <p>
      Using:
      <a href="https://github.com/iddan/react-spreadsheet/">
        https://github.com/iddan/react-spreadsheet/
      </a>
    </p>
  </>
);

export default InlineSheet;


// https://codesandbox.io/s/jl05r5mov5?file=/src/spreadsheet.js:0-2622