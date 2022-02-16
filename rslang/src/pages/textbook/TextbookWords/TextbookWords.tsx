import { useLocation } from 'react-router-dom';
import { Pagination, CircularProgress } from '@mui/material';

import {
  useContext,
  useCallback,
  useState,
  useEffect,
  ChangeEvent,
} from 'react';
import classNames from 'classnames';
import { TUserWord, TWord } from '../../../api/types';
import WordsAPI from '../../../api/wordsAPI';
import EnglishLevelButton from '../../../Components/EnglishLevelButton/EnglishLevelButton';
import { ENGLISH_LEVELS } from '../../../General/constants';
import TextbookGamesButton from '../components/TextbookGamesButton/TextbookGamesButton';
import { LoginContext } from '../../../Context/login-context';
import userWordsAPI from '../../../api/userWordsAPI';
import WordCardList from '../components/WordCardList/WordCardList';

import './TextbookWords.scss';

export type TPlayListCollection = {
  [key: string]: string[];
};

const TextbookWords = () => {
  const location = useLocation();
  const lengthLocation = location.pathname.split('/').length;
  const groupLevel = +location.pathname.split('/')[lengthLocation - 1];

  const [words, setWords] = useState<TWord[]>([]);
  const [currPage, setPage] = useState(1);
  const { userLoginData } = useContext(LoginContext);
  const [loading, setLoading] = useState(false);

  const handleChangePage = (event: ChangeEvent<unknown>, pageNum: number) => {
    if (!event.target) {
      return;
    }
    if (pageNum !== null) {
      setPage(pageNum);
    }
  };

  useEffect(() => {
    setLoading(true);
    const page = currPage - 1;
    WordsAPI.getWords(
      page,
      groupLevel,
      (data: TWord[]) => setWords(data),
      () => setLoading(false),
    );
  }, [currPage, location.pathname, groupLevel]);

  const onSelectCard = useCallback(
    (wordId) => {
      const userId = `${localStorage.getItem('userId')}`;
      const token = `${localStorage.getItem('token')}`;
      userWordsAPI.createUserWord(
        userId,
        wordId,
        token,
        {
          difficulty: 'difficult',
          optional: {
            isDifficult: true,
            deleted: false,
            group: groupLevel,
            page: currPage,
          },
        },
        (data: TUserWord) => console.error(data),
      );
    },
    [groupLevel, currPage],
  );

  return (
    <div className="textbook_page">
      <div className="textbook_games-button-container">
        <span className="textbook_games-button-container-title">
          Закрепи слова при помощи игр.
        </span>
        <TextbookGamesButton
          path={`/games/audio/${groupLevel}/${currPage - 1}`}
          name="Аудиовызов"
          className="textbook_games-btn"
        />
        <TextbookGamesButton
          path={`/games/sprint/${groupLevel}/${currPage - 1}`}
          name="Спринт"
          className="textbook_games-btn"
        />
        <TextbookGamesButton
          path="/dictionary"
          name="Словарь"
          className={classNames('textbook_games-btn', {
            'is-unauthorized': !userLoginData.isLogined,
          })}
        />
      </div>
      <section className="textbook_section-button">
        {Object.values(ENGLISH_LEVELS).map(({ id, code }) => (
          <EnglishLevelButton
            path="/textbook/words/"
            key={id}
            id={id}
            code={code}
          />
        ))}
      </section>
      <div className="textbook_words-container">
        {loading && <CircularProgress className="circular-progress" />}
        <WordCardList
          words={words}
          group={groupLevel}
          onSelectCard={onSelectCard}
          isAuthorized={userLoginData.isLogined}
        />

        <Pagination
          count={30}
          variant="outlined"
          color="primary"
          defaultPage={1}
          onChange={handleChangePage}
          className="textbook_pagination"
        />
      </div>
    </div>
  );
};

export default TextbookWords;
