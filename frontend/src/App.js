import React, { Component } from 'react';

import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from './pages/HomePage';
import './App.css';

function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
