import { useEffect, useState, useContext } from 'react';
import Hotkeys from 'react-hot-keys';
import { Button, Typography, Card } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';

import Timer from './Timer/timer';
import Parrots from './Parrots/parrots';
import TickPannel from './TickPannel/tick-pannel';
import {
  getExtraPointsByString,
  getExtraPointsString,
  getRandomInteger,
} from '../../../../General/utils';
import { getGameWords } from '../../../../General/game-utils';
import { TWord } from '../../../../api/types';
import { WORDS_COUNT_FOR_SPRINT_GAME } from '../../../../General/constants';
import { LoginContext } from '../../../../Context/login-context';
import GameResults from '../../../../Components/GameResults/GameResults';

const GameSprintLevel = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { userLoginData, setUserLogin } = useContext(LoginContext);

  const [time, setTime] = useState(60);
  const [isSound, setIsSound] = useState(true);
  const [isPlay, setIsPlay] = useState(false);
  const [correctAnswersCount, setCorrectAnswersCount] = useState(0);
  const [correctAnswersCountTotal, setCorrectAnswersCountTotal] = useState(0);
  const [wrongAnswersCountTotal, setWrongAnswersCountTotal] = useState(0);
  const [points, setPoints] = useState(0);
  const [extraPoints, setExtraPoints] = useState('');
  const [englishVersion, setEnglishVersion] = useState('');
  const [russianVersion, setRussianVersion] = useState('');
  const [isCorrectAnswer, setIsCorrectAnswer] = useState(false);
  const [isWrongAnswer, setIsWrongAnswer] = useState(false);
  const [isResultsModalOpen, setIsResultsModalOpen] = useState(false);
  const [gameWords, setGameWords] = useState<TWord[]>([]);
  const [correctWords, setCorrectWords] = useState<TWord[]>([]);
  const [wrongWords, setWrongWords] = useState<TWord[]>([]);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [pageForGames, setPageForGames] = useState(-1);

  useEffect((): (() => void) => {
    if (isPlay) {
      const timer = setTimeout(() => {
        if (time !== 0) setTime((prev) => prev - 1);
      }, 1000);
      return () => clearTimeout(timer);
    }
    return () => {};
  }, [time, isPlay]);

  useEffect(() => {
    if (time === 0) {
      setIsPlay(false);
      setIsResultsModalOpen(true);
    }
  }, [time]);

  useEffect(() => {
    const pathArr = location.pathname.split('/');
    const page = userLoginData.pageForGames;
    setPageForGames(page);
    if (page !== -1) {
      setUserLogin({
        ...userLoginData,
        pageForGames: -1,
      });
    }
    getGameWords(
      page,
      Number(pathArr[pathArr.length - 1]),
      WORDS_COUNT_FOR_SPRINT_GAME,
    ).then((data) => {
      setGameWords(data);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setExtraPoints(getExtraPointsString(correctAnswersCount));
  }, [correctAnswersCount]);

  useEffect((): (() => void) => {
    if (isCorrectAnswer) {
      if (isSound) {
        if (correctAnswersCount % 4 === 0) {
          const soundCorrectLevelUp = new Audio(
            '/assets/audio/correct-answer-level-up.mp3',
          );
          soundCorrectLevelUp.play();
        } else {
          const soundCorrect = new Audio('/assets/audio/correct-answer.mp3');
          soundCorrect.play();
        }
      }
      const timer = setTimeout(() => {
        setIsCorrectAnswer(false);
      }, 300);
      return () => clearTimeout(timer);
    }
    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isCorrectAnswer]);

  useEffect((): (() => void) => {
    if (isWrongAnswer) {
      if (isSound) {
        const soundWrong = new Audio('/assets/audio/wrong-answer.mp3');
        soundWrong.play();
      }
      const timer = setTimeout(() => {
        setIsWrongAnswer(false);
      }, 300);
      return () => clearTimeout(timer);
    }
    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isWrongAnswer]);

  const handlePlay = () => {
    setCurrentWord();
    setIsPlay(true);
  };

  const handleIsSound = () => {
    setIsSound(!isSound);
  };

  // const increaseCorrectCount = () => {
  //   setCorrectAnswersCount((prev) => prev + 1);
  // };

  const setAnswerAsCorrect = () => {
    setIsCorrectAnswer(true);
    setCorrectAnswersCount((prev) => prev + 1);
    setCorrectAnswersCountTotal((prev) => prev + 1);
    setPoints((prev) => prev + 10 + getExtraPointsByString(extraPoints));
  };

  const setAnswerAsFalse = () => {
    setIsWrongAnswer(true);
    setCorrectAnswersCount(0);
    setWrongAnswersCountTotal((prev) => prev + 1);
  };

  // const handleOpenResults = () => {
  //   setIsResultsModalOpen((prev) => !prev);
  // };

  const handleCloseGame = () => {
    navigate('/games', { replace: true });
  };

  const setCurrentWord = () => {
    if (gameWords.length === 0) {
      setGameEnded();
    } else {
      const random10 = getRandomInteger(1, 10);
      setCurrentWordIndex(gameWords.length - 1);
      setEnglishVersion(gameWords[gameWords.length - 1].word);
      if (random10 < 5) {
        setRussianVersion(gameWords[gameWords.length - 1].wordTranslate);
      } else {
        const randomWordIndex = getRandomInteger(0, gameWords.length - 1);
        setRussianVersion(gameWords[randomWordIndex].wordTranslate);
      }
    }
  };

  const handleWrongBtnClick = () => {
    const word = gameWords[gameWords.length - 1];
    if (gameWords[currentWordIndex].wordTranslate !== russianVersion) {
      setAnswerAsCorrect();
      setCorrectWords(correctWords.concat(word));
    } else {
      setAnswerAsFalse();
      setWrongWords(wrongWords.concat(word));
    }
    const arr = gameWords;
    arr.pop();
    setGameWords(arr);
    setCurrentWord();
  };

  const handleCorrectBtnClick = () => {
    const word = gameWords[gameWords.length - 1];
    if (gameWords[currentWordIndex].wordTranslate === russianVersion) {
      setAnswerAsCorrect();
      setCorrectWords(correctWords.concat(word));
    } else {
      setAnswerAsFalse();
      setWrongWords(wrongWords.concat(word));
    }
    const arr = gameWords;
    arr.pop();
    setGameWords(arr);
    setCurrentWord();
  };

  const handleCloseResults = () => {
    setIsResultsModalOpen(false);
    setCorrectWords([]);
    setWrongWords([]);
    setGameWords([]);
    getWords();
    setTime(60);
    setCorrectAnswersCount(0);
    setCorrectAnswersCountTotal(0);
    setWrongAnswersCountTotal(0);
    setPoints(0);
    setExtraPoints('');
    setEnglishVersion('');
    setRussianVersion('');
    setIsCorrectAnswer(false);
    setIsWrongAnswer(false);
    setCurrentWordIndex(0);
  };

  const getWords = () => {
    const pathArr = location.pathname.split('/');
    getGameWords(
      pageForGames,
      Number(pathArr[pathArr.length - 1]),
      WORDS_COUNT_FOR_SPRINT_GAME,
    ).then((data) => {
      setGameWords(data);
    });
  };

  const setGameEnded = () => {
    setTime(0);
    setIsPlay(false);
    setIsResultsModalOpen(true);
  };

  const handleKeyPress = (keyName: string, event: Event) => {
    event.preventDefault();
    if (
      keyName === 'space' &&
      !isPlay &&
      gameWords.length > 0 &&
      !isResultsModalOpen
    ) {
      handlePlay();
    }
    if (keyName === 'a' && isPlay && !isResultsModalOpen) {
      handleWrongBtnClick();
    }
    if (keyName === 's' && isPlay && !isResultsModalOpen) {
      handleCorrectBtnClick();
    }
  };

  return (
    <div className="App-games">
      <Hotkeys
        keyName="space, a, s"
        onKeyDown={(keyName, event) => {
          handleKeyPress(keyName, event);
        }}
      >
        <div className="sprint-game-container">
          <div className="sprint-game-inner">
            <div className="timer-wrapper">
              <Timer time={time} isSound={isSound} isPlay={isPlay} />
              <Typography variant="h3" style={{ color: 'white' }}>
                {points}
              </Typography>
              <div className="cancel-wrapper">
                <button
                  type="button"
                  className="cancel-sprint-game-btn"
                  onClick={handleCloseGame}
                >
                  <Typography variant="h4">❌</Typography>
                </button>
              </div>
            </div>
            <div
              className={`sprint-game-main-wrapper ${
                isCorrectAnswer ? 'correct' : ''
              } ${isWrongAnswer ? 'wrong' : ''}`}
            >
              <Typography
                variant="h6"
                className="sprint-addition-points"
                style={{ height: '30px' }}
              >
                {extraPoints}
              </Typography>
              <Parrots correctAnswersCount={correctAnswersCount} />
              <TickPannel correctAnswersCount={correctAnswersCount} />
              <Typography
                className="sprint-eng-version"
                variant="h3"
                style={{ height: '40px' }}
              >
                {englishVersion}
              </Typography>
              <Typography
                className="sprint-rus-version"
                variant="h4"
                style={{ height: '40px' }}
              >
                {russianVersion}
              </Typography>
              <div className="sprint-answer-btns-wrapper">
                <Button
                  variant="contained"
                  className="sprint-btn-wrong"
                  disabled={!isPlay}
                  onClick={handleWrongBtnClick}
                >
                  <Typography variant="h3">Неверно</Typography>
                </Button>
                <Button
                  className="sprint-btn-correct"
                  variant="contained"
                  disabled={!isPlay}
                  onClick={handleCorrectBtnClick}
                >
                  <Typography variant="h3">Верно</Typography>
                </Button>
              </div>
              <button
                type="button"
                onClick={handleIsSound}
                className="sprint-sound-btn"
                style={{
                  backgroundImage: `url(/assets/img/${
                    isSound ? 'unmute' : 'mute'
                  }.png`,
                }}
              >
                {}
              </button>
            </div>
            <div className="sprint-game-btns-wrapper">
              <Button
                disabled={isPlay || gameWords.length === 0}
                className="sprint-btn-play"
                variant="contained"
                color="success"
                onClick={handlePlay}
                style={{ borderRadius: '10px' }}
              >
                <Typography variant="h4">Играть</Typography>
              </Button>
            </div>
          </div>
          <div
            className={`sprint-game-results-wrapper ${
              isResultsModalOpen ? 'active' : ''
            }`}
          >
            <Card>
              <div className="results-inner-wrapper">
                <button
                  type="button"
                  className="results-inner-wrapper-close-btn"
                  onClick={handleCloseResults}
                >
                  <Typography variant="h4">❌</Typography>
                </button>
                <GameResults
                  correctCount={correctAnswersCountTotal}
                  wrongCount={wrongAnswersCountTotal}
                  correctWords={correctWords}
                  wrongWords={wrongWords}
                />
              </div>
            </Card>
          </div>
          <div
            className={`game-results-background ${
              isResultsModalOpen ? 'active' : ''
            }`}
            onClick={handleCloseResults}
          />
        </div>
      </Hotkeys>
    </div>
  );
};

export default GameSprintLevel;
