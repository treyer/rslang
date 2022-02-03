import React, { useEffect } from 'react';
import { TWord } from './api/types';
import WordsApi from './api/wordsApi';
import './App.css';

function App() {
  useEffect(() => {
    WordsApi.getWords(2, 2, (data: TWord[]) => console.log(data));
  }, []);

  return (
    <div className="App">
      <header className="App-header" />
    </div>
  );
}

export default App;
