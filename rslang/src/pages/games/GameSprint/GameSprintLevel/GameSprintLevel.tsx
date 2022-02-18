import { useEffect, useState } from 'react';
import { Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import Timer from './Timer/timer';
import Parrots from './Parrots/parrots';
import TickPannel from './TickPannel/tick-pannel';
import {
  getExtraPointsByString,
  getExtraPointsString,
} from '../../../../General/utils';
import { getGameWords } from '../../../../General/game-utils';
import { TWord } from '../../../../api/types';

const GameSprintLevel = () => {
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
  const [isResultsOpen, setIsResultsOpen] = useState(false);
  const [gameWords, setGameWords] = useState<TWord[]>([]);
  const navigate = useNavigate();

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
    getGameWords(-1, 3, 38).then((data) => {
      setGameWords(data);
    });
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
    setIsPlay(true);
  };

  const handleIsSound = () => {
    setIsSound(!isSound);
  };

  const increaseCorrectCount = () => {
    setCorrectAnswersCount((prev) => prev + 1);
  };

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

  const handleOpenResults = () => {
    setIsResultsOpen((prev) => !prev);
  };

  const handleCloseGame = () => {
    navigate('/games', { replace: true });
  };

  return (
    <div className="App-games">
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
              >
                <Typography variant="h3">Неверно</Typography>
              </Button>
              <Button
                className="sprint-btn-correct"
                variant="contained"
                disabled={!isPlay}
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
            <Button variant="contained" onClick={increaseCorrectCount}>
              +
            </Button>
            <Button variant="contained" onClick={setAnswerAsCorrect}>
              correct
            </Button>
            <Button variant="contained" onClick={setAnswerAsFalse}>
              false
            </Button>
            <Button variant="contained" onClick={handleOpenResults}>
              openModal
            </Button>
            <Button variant="contained">{gameWords.length}</Button>
            <Button
              disabled={isPlay}
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
      </div>
    </div>
  );
};

export default GameSprintLevel;
