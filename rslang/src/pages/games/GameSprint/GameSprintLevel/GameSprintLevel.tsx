import { useEffect, useState } from 'react';
import { Button, Typography } from '@mui/material';

import Timer from './Timer/timer';
import Parrots from './Parrots/parrots';
import TickPannel from './TickPannel/tick-pannel';
import { getExtraPointsString } from '../../../../General/utils';

const GameSprintLevel = () => {
  const [time, setTime] = useState(60);
  const [isSound, setIsSound] = useState(true);
  const [isPlay, setIsPlay] = useState(false);
  const [correctAnswersCount, setCorrectAnswersCount] = useState(0);
  const [points, setPoints] = useState(0);
  const [extraPoints, setExtraPoints] = useState('');
  const [englishVersion, setEnglishVersion] = useState('');
  const [russianVersion, setRussianVersion] = useState('');

  useEffect(() => {
    if (isPlay) {
      setTimeout(() => {
        if (time !== 0) setTime((prev) => prev - 1);
      }, 1000);
    }
  }, [time, isPlay]);

  useEffect(() => {
    setExtraPoints(getExtraPointsString(correctAnswersCount));
  }, [correctAnswersCount]);

  const handlePlay = () => {
    setIsPlay(true);
  };

  const handleIsSound = () => {
    setIsSound(!isSound);
  };

  const increaseCorrectCount = () => {
    setCorrectAnswersCount((prev) => prev + 1);
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
              <button type="button" className="cancel-sprint-game-btn">
                <Typography variant="h4">❌</Typography>
              </button>
            </div>
          </div>
          <div className="sprint-game-main-wrapper correct">
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
