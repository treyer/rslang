import React from 'react';

import TextbookGamesButton from '../components/TextbookGamesButton/TextbookGamesButton';

import './Dictionary.scss';

const Dictionary = () => (
  <div className="dictionary-container">
    <div className="dictionary_btn-container">
      <TextbookGamesButton
        path="/dictionary/"
        name="Изучаемые"
        className="dictionary_btn"
      />
      <TextbookGamesButton
        path="/dictionary/"
        name="Сложные"
        className="dictionary_btn"
      />
      <TextbookGamesButton
        path="/dictionary/"
        name="Удаленные"
        className="dictionary_btn"
      />
    </div>
    <div className="dictionary_words-container">fff</div>
    <div className="dictionary_btn-container">
      <span className="dictionary_games-button-title">
        Закрепи слова при помощи игр.
      </span>
      <TextbookGamesButton
        path="/games/audio/"
        name="Аудиовызов"
        className="dictionary_games-btn"
      />
      <TextbookGamesButton
        path="/games/sprint/"
        name="Спринт"
        className="dictionary_games-btn"
      />
      <TextbookGamesButton
        path="/textbook/englishLevels"
        name="Учебник"
        className="dictionary_games-btn"
      />
    </div>
  </div>
);

export default Dictionary;
