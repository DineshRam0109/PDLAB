import React from "react";
import LoginPage from "./Components/Login/LoginPage";
import { useState } from 'react'
import './App.css'
import Header from './components/header/Header'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Dashboard from './components/Dashboard/Dashboard';
import Master from './components/Admin/Master/Master';
import Ledger from './components/Admin/Ledger/Ledger';
import Report from './components/Admin/Report/Report'
function App() {
  return (
<BrowserRouter>
<Header />
<Routes>
  <Route path="/" element={<Dashboard/>}></Route>
  <Route path='/master' element={<Master/>}></Route>
  <Route path='/ledger' element={<Ledger/>}></Route>
  <Route path='/report' element={<Report/>}></Route>
</Routes>
</BrowserRouter>
  );
}

export default App;
