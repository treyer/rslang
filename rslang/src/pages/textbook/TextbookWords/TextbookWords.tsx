import { useLocation } from 'react-router-dom';
import { Pagination } from '@mui/material';

import {
  useContext,
  useCallback,
  useState,
  useMemo,
  useEffect,
  MouseEvent,
  ChangeEvent,
} from 'react';
import classNames from 'classnames';
import { TWord } from '../../../api/types';
import WordsAPI from '../../../api/wordsAPI';

import { SERVER_URL } from '../../../consts';
import WordCard from '../components/WordCard/WordCard';
import EnglishLevelButton from '../../../Components/EnglishLevelButton/EnglishLevelButton';
import { ENGLISH_LEVELS } from '../../../General/constants';
import TextbookGamesButton from '../components/TextbookGamesButton/TextbookGamesButton';
import { LoginContext } from '../../../Context/login-context';

import './TextbookWords.scss';

export type TPlayListCollection = {
  [key: string]: string[];
};

const TextbookWords = () => {
  const location = useLocation();
  const lengthLocation = location.pathname.split('/').length;
  const groupLevel = +location.pathname.split('/')[lengthLocation - 1];

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(0);
  const [words, setWords] = useState<TWord[]>([]);
  const [playList, setPlayList] = useState<TPlayListCollection>({});
  const [playedWordId, setPlayedWordId] = useState('');
  const [currPage, setPage] = useState(1);
  const { userLoginData } = useContext(LoginContext);

  const playedAudio = useMemo(() => {
    const track = playList[playedWordId]?.[currentTrack];
    return track ? new Audio(track) : null;
  }, [currentTrack, playedWordId, playList]);

  const handleCardHover = useCallback((e: MouseEvent) => {
    const target = e.currentTarget as HTMLElement;
    if (!target) {
      return;
    }

    setPlayedWordId(target.id);
    setCurrentTrack(0);
  }, []);

  const playTextbookWord = useCallback(() => {
    if (!playedAudio) {
      return;
    }

    if (isPlaying) {
      playedAudio.pause();
      setIsPlaying(false);
      return;
    }

    if (!isPlaying) {
      playedAudio.play();
      setIsPlaying(true);
    }
  }, [isPlaying, playedAudio]);

  useEffect(() => {
    if (playedAudio) {
      playedAudio.addEventListener('ended', () => {
        const nextTrack = playList[playedWordId]?.[currentTrack + 1]
          ? currentTrack + 1
          : 0;
        setIsPlaying(false);
        setCurrentTrack(nextTrack);
      });
    }
  }, [playedAudio, playedWordId, currentTrack, playList]);

  const handleChangePage = (event: ChangeEvent<unknown>, pageNum: number) => {
    if (!event.target) {
      return;
    }
    if (pageNum !== null) {
      setPage(pageNum);
    }
  };

  useEffect(() => {
    const page = currPage - 1;
    WordsAPI.getWords(page, groupLevel, (data: TWord[]) => setWords(data));
  }, [currPage, location.pathname, groupLevel]);

  useEffect(() => {
    const newPlayList = words.reduce(
      (acc, { id, audio, audioMeaning, audioExample }) => {
        acc[id] = [
          `${SERVER_URL}/${audio}`,
          `${SERVER_URL}/${audioMeaning}`,
          `${SERVER_URL}/${audioExample}`,
        ];
        return acc;
      },
      {} as TPlayListCollection,
    );
    setPlayList(newPlayList);
  }, [words]);

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
        {words.map(
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
              onPlayWord={playTextbookWord}
              onHover={handleCardHover}
              group={groupLevel}
              isAuthorized={userLoginData.isLogined}
            />
          ),
        )}
        <Pagination
          count={30}
          variant="outlined"
          color="primary"
          defaultPage={1}
          onChange={handleChangePage}
        />
      </div>
    </div>
  );
};

export default TextbookWords;
