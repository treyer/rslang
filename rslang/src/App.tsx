import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './Components/header/header';
import Games from './pages/games/games';
import Main from './pages/main/main';
import Statistics from './pages/statistics/statistics';
import Textbook from './pages/textbook/textbook';

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/games" element={<Games />} />
        <Route path="/textbook" element={<Textbook />} />
        <Route path="/statistics" element={<Statistics />} />
      </Routes>
    </div>
  );
}

export default App;
