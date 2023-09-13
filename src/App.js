import React from 'react'
import './App.css';
import Navbar from './components/navbar/navbar';
import Card from './components/card/card';
import Board from './components/board/board';
import Column from './components/column/column';
import { useEffect , useState } from 'react';


function App() {



  return (
    <>
    <Navbar/>
    <Board/>
    </>
  );
}

export default App;