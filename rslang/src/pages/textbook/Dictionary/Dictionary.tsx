import { CircularProgress } from '@mui/material';
import React, { useEffect, useState, useCallback, MouseEvent } from 'react';

import { TWord } from '../../../api/types';
import UserAggregatedWordsAPI from '../../../api/userAggregatedWordsAPI';

import TextbookGamesButton from '../components/TextbookGamesButton/TextbookGamesButton';

import WordCardList from '../components/WordCardList/WordCardList';
import { DICTIONARY_CATEGORIES } from '../constants/constants';

import './Dictionary.scss';

type TDictionaryCategory = keyof typeof DICTIONARY_CATEGORIES;

const Dictionary = () => {
  const [words, setWords] = useState<TWord[]>([]);
  const [currFilter, setCurrFilter] = useState(
    '{"userWord.difficulty":"difficult", "userWord.optional.isDifficult":true}',
  );
  const [currCategory, setCurrCategory] = useState<TDictionaryCategory>('0');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const userId = `${localStorage.getItem('userId')}`;
    const token = `${localStorage.getItem('token')}`;
    const group = '';
    const page = '';
    const filter = currFilter;

    setLoading(true);
    UserAggregatedWordsAPI.getAggregatedUserWords(
      userId,
      token,
      (data: TWord[]) => setWords(data),
      () => setLoading(false),
      group,
      page,
      filter,
      '20',
    );
  }, [currFilter]);

  const onHandleChangeCategory = useCallback((e: MouseEvent) => {
    const target = e.currentTarget as HTMLElement;
    if (!target) {
      return;
    }
    const id = target.id as TDictionaryCategory;
    const filterRequest = DICTIONARY_CATEGORIES[id].filter;
    setCurrFilter(filterRequest);
    setCurrCategory(id);
  }, []);

  const hasEmptyMessage = words.length === 0 && !loading;
  const hasWordCards = words.length !== 0 && !loading;

  return (
    <div className="dictionary-container">
      <div className="dictionary_btn-container" key="dictionary_btn">
        <TextbookGamesButton
          id="0"
          path="/dictionary/"
          name="Сложные"
          className="dictionary_btn"
          onClick={onHandleChangeCategory}
        />
        <TextbookGamesButton
          id="1"
          path="/dictionary/"
          name="Изучаемые"
          className="dictionary_btn"
          onClick={onHandleChangeCategory}
        />
        <TextbookGamesButton
          id="2"
          path="/dictionary/"
          name="Удаленные"
          className="dictionary_btn"
          onClick={onHandleChangeCategory}
        />
      </div>
      <div className="words_list-container" key="words_list-container">
        {loading && <CircularProgress className="circular-progress" />}
        {hasWordCards && (
          <WordCardList
            key="dictionary_word-list"
            words={words}
            onSelectCard={() => console.error('ll')}
            onUnSelectCard={() => console.error('ll')}
          />
        )}
        {hasEmptyMessage && (
          <p className="dictionary-message">
            {DICTIONARY_CATEGORIES[currCategory].message}
          </p>
        )}
      </div>
      <div className="dictionary_btn-container" key="dictionary_games-btn">
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
};

export default Dictionary;
