import './App.css';
import React, { useState } from 'react';
import Login from './components/Login.jsx';
import Navbar from './components/Navbar.jsx';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Dash from './components/Dash.jsx';

function App() {

  return (
    <>
      <Navbar/>
    </>
  );
}

export default App;
