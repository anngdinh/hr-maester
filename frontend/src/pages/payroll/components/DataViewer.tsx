import React from "react";
import { ComponentType, ReactNode as Node } from "react";

type Cell = {
  component?: ComponentType<{
    row: number;
    column: number;
    value: Node;
  }>;
};

const toView = (value: Node | boolean): Node => {
  if (value === false) {
    return <div className="boolean">FALSE</div>;
  }
  if (value === true) {
    return <div className="boolean">TRUE</div>;
  }
  return value;
};

const DataViewer = ({ getValue, cell, column, row, formulaParser }) => {
  const rawValue = getValue({ data: cell, column, row });
  if (typeof rawValue === "string" && rawValue.startsWith("=")) {
    const { result, error } = formulaParser.parse(rawValue.slice(1));
    return error || toView(result);
  }
  return toView(rawValue);
};

export default DataViewer;

