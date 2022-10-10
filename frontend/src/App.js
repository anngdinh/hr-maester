import React, { Component } from 'react';

import { BrowserRouter, Route, Routes } from "react-router-dom";
import NewPayroll from './pages/payroll/NewPayroll';

function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="payroll" element={<NewPayroll />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
