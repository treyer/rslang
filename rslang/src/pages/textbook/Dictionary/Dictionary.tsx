import React, { useEffect, useState, useCallback, MouseEvent } from 'react';

import { TWord } from '../../../api/types';
import UserAggregatedWordsAPI from '../../../api/userAggregatedWordsAPI';

import TextbookGamesButton from '../components/TextbookGamesButton/TextbookGamesButton';
import WordCard from '../components/WordCard/WordCard';
import { DICTIONARY_CATEGORIES } from '../constants/constants';

import './Dictionary.scss';

type TDictionaryCategory = keyof typeof DICTIONARY_CATEGORIES;

const Dictionary = () => {
  const [words, setWords] = useState<TWord[]>([]);
  const [currFilter, setCurrFilter] = useState(
    '{"userWord.difficulty":"difficult", "userWord.optional.isDifficult":true}',
  );
  const [currCategory, setCurrCategory] = useState<TDictionaryCategory>('0');

  useEffect(() => {
    const userId = `${localStorage.getItem('userId')}`;
    const token = `${localStorage.getItem('token')}`;
    const group = '';
    const page = '';
    const filter = currFilter;

    UserAggregatedWordsAPI.getAggregatedUserWords(
      userId,
      token,
      (data: TWord[]) => setWords(data),
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

  return (
    <div className="dictionary-container">
      <div className="dictionary_btn-container">
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
      <div className="dictionary_words-container">
        {words.length ? (
          words.map(
            ({
              id,
              word,
              image,
              textMeaning,
              textExample,
              transcription,
              wordTranslate,
              textMeaningTranslate,
              textExampleTranslate,
            }) => (
              <WordCard
                key={id}
                id={id}
                word={word}
                image={image}
                textMeaning={textMeaning}
                textExample={textExample}
                transcription={transcription}
                wordTranslate={wordTranslate}
                textMeaningTranslate={textMeaningTranslate}
                textExampleTranslate={textExampleTranslate}
                onPlayWord={() => console.error('ll')}
                onHover={() => console.error('ll')}
                onSelectCard={() => console.error('ll')}
              />
            ),
          )
        ) : (
          <p>{DICTIONARY_CATEGORIES[currCategory].message}</p>
        )}
      </div>
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
};

export default Dictionary;
