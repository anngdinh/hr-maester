import React, { Component } from 'react';

import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from './pages/HomePage';
import './App.css';
import Login from './pages/authorization/Login';
import SignUp from './pages/authorization/SignUp';

function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/sign-up" element={<SignUp />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
