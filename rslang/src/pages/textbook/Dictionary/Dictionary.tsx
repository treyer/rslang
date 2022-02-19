import { CircularProgress } from '@mui/material';
import React, { useEffect, useState, useCallback, MouseEvent } from 'react';
import { useLocation } from 'react-router-dom';
import classNames from 'classnames';

import { TWord } from '../../../api/types';
import UserAggregatedWordsAPI from '../../../api/userAggregatedWordsAPI';
import UserWordsAPI from '../../../api/userWordsAPI';

import TextbookGamesButton from '../components/TextbookGamesButton/TextbookGamesButton';

import WordCardList from '../components/WordCardList/WordCardList';
import { DICTIONARY_CATEGORIES, WORDS_PER_PAGE } from '../constants/constants';

import './Dictionary.scss';

type TDictionaryCategory = keyof typeof DICTIONARY_CATEGORIES;

const Dictionary = () => {
  const location = useLocation();
  const lengthLocation = location.pathname.split('/').length;
  const groupLevel = +location.pathname.split('/')[lengthLocation - 1];
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
      group,
      page,
      WORDS_PER_PAGE,
      filter,
      () => setLoading(false),
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

  const onUnSelectCard = useCallback(
    (wordId) => {
      const userId = `${localStorage.getItem('userId')}`;
      const token = `${localStorage.getItem('token')}`;
      const dataWord = {
        difficulty: 'difficult',
        optional: {
          isDifficult: false,
          deleted: true,
          failCounter: 0,
          successCounter: 0,
          correctAnswer: 0,
        },
      };

      if (currCategory === '0') {
        UserWordsAPI.deleteUserWord(userId, wordId, token);
      } else {
        UserWordsAPI.updateUserWord(userId, token, wordId, dataWord);
      }
      setWords(words.filter((word) => word._id !== wordId));
    },
    [currCategory, words],
  );

  const onSelectCard = useCallback(
    (wordId) => {
      const userId = `${localStorage.getItem('userId')}`;
      const token = `${localStorage.getItem('token')}`;

      /*  UsersStatisticAPI.upsetStatistics(userId, token, {
        learnedWords: 2,
        optional: {
          audioCall: {
            rightAnswers: 2,
            wrongAnswers: 1,
          },
        },
      });  */

      /*  UsersStatisticAPI.getStatistics(userId, token, (data: TStatistic) =>
        console.error('ff: ', data),
      );  */

      if (currCategory === '0') {
        UserWordsAPI.updateUserWord(userId, token, wordId, {
          difficulty: 'difficult',
          optional: {
            isDifficult: false,
            deleted: true,
            failCounter: 0,
            successCounter: 0,
            correctAnswer: 0,
          },
        });
      } else {
        UserWordsAPI.updateUserWord(userId, token, wordId, {
          difficulty: 'difficult',
          optional: {
            isDifficult: true,
            deleted: false,
            failCounter: 0,
            successCounter: 0,
            correctAnswer: 0,
          },
        });
      }
      setWords(words.filter((word) => word._id !== wordId));
    },
    [currCategory, words],
  );

  return (
    <div className="dictionary-container">
      <div className="dictionary_btn-container" key="dictionary_btn">
        {Object.values(DICTIONARY_CATEGORIES).map(({ id, name }) => (
          <TextbookGamesButton
            id={id}
            path={`/dictionary/${groupLevel}`}
            key={id}
            name={name}
            className={classNames('dictionary_btn', {
              'dictionary_active-btn': id === currCategory,
            })}
            onClick={onHandleChangeCategory}
          />
        ))}
      </div>
      <div className="words_list-container" key="words_list-container">
        {loading && <CircularProgress className="circular-progress" />}
        {hasWordCards && (
          <WordCardList
            key="dictionary_word-list"
            words={words}
            onSelectCard={onSelectCard}
            onUnSelectCard={onUnSelectCard}
            currCategory={currCategory}
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
          path={`/textbook/words/${groupLevel}`}
          name="Учебник"
          className="dictionary_games-btn"
        />
      </div>
    </div>
  );
};

export default Dictionary;
