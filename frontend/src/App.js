import React, { Component } from 'react';

import { BrowserRouter, Route, Routes } from "react-router-dom";
import NewPayroll from './pages/payroll/Payroll';

function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<NewPayroll />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
