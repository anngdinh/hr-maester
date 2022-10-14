import React, { Component } from 'react';

import { BrowserRouter, Route, Routes } from "react-router-dom";
import NewPayroll from './pages/payroll/NewPayroll';
import ReactDataSheetDemo from './pages/payroll/react-datasheet';
import SheetDemo from './pages/payroll/sheet_demo';

function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ReactDataSheetDemo />} />
          <Route path="/s" element={<SheetDemo />} />
          <Route path="/p" element={<NewPayroll />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
