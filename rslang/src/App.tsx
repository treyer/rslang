import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';

import { TWord } from './api/types';
import WordsApi from './api/wordsApi';
import { Sections } from './General/constants';
import Header from './Components/header/header';

import './App.css';

function App() {
  useEffect(() => {
    WordsApi.getWords(2, 2, (data: TWord[]) => console.log(data));
  }, []);

  return (
    <div className="App">
      <Header />
      <Routes>
        {Sections.map((el) => (
          <Route key={el.id} path={el.routePath} element={el.element} />
        ))}
      </Routes>
    </div>
  );
}

export default App;
