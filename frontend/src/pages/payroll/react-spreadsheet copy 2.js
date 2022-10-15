import React, { useState } from "react";
import Spreadsheet, { createEmptyMatrix, Matrix } from "react-spreadsheet";
// import "./styles.css";

const DataDemo = () => {
  const labelColumns = ["Produto", "Parcela", "Dias", "Valor"];
  const initialData = createEmptyMatrix(1, 4);
  const [data, setData] = useState(initialData);

  const NumberView = ({ cell, getValue }) => (
    <span>
      {/* {cell.value} */}
      {() => getValue({ data: cell })}
    </span>
    //   type="number"
    //   value={() => getValue({ data: cell })}
    //   disabled
    //   style={{ pointerEvents: "none" }}
    // />
  );

  const NumberEdit = ({ getValue, cell, onChange }) => (
    <input
      type="text"
      // onChange={e => {
      //   // onChange({ ...cell, value: e.target.value });
      //   console.log({getValue, cell, onChange, }, getValue({ data: cell }))
        
      // }}
      onChange={e => {
        onChange({ ...cell, value: e.target.value });
        // console.log({e})
      }}
      // value={() => getValue({ data: cell }) || ""}
      autoFocus
    />
  );
  // const NumberEdit = ({ getValue, cell, onChange }) => {
  //   // const value = () => getValue({ data: cell }) || "0"
  //   return (<input
  //     type="text"
  //     onChange={(e) => {
  //       console.log(e);
  //       // const re = /^[0-9]+$/;
  //       // if (e.target.value === "" || re.test(e.target.value)) {
  //       //   onChange({ ...cell, value: e.target.value });
  //       // }
  //     }}
  //     // value={() => getValue({ data: cell }) || "0"}
  //     // autoFocus
  //   >
  //     {/* {value} */}
  //     {/* {() => getValue({ data: cell }) || "0"} */}
  //   </input>)
  // }


  return (
    <div className="container">
      <div style={{ justifyContent: "center", alignItems: "center" }}>
        <Spreadsheet
          data={data}
          onChange={setData}
          hideRowIndicators
          columnLabels={labelColumns}
          DataEditor={NumberEdit}
          // DataViewer={NumberView}
        />
      </div>
      <button className="button" onClick={() => console.log(data)}>
        Log
      </button>
    </div>
  );
};

export default DataDemo;
