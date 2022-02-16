import { useEffect, useState } from 'react';
import { Button, Typography } from '@mui/material';

import Timer from './Timer/timer';
import Parrots from './Parrots/parrots';
import TickPannel from './TickPannel/tick-pannel';

const GameSprintLevel = () => {
  const [time, setTime] = useState(60);
  const [isSound, setIsSound] = useState(true);
  const [isPlay, setIsPlay] = useState(false);
  const [correctAnswersCount, setCorrectAnswersCount] = useState(0);

  useEffect(() => {
    if (isPlay) {
      setTimeout(() => {
        if (time !== 0) setTime((prev) => prev - 1);
      }, 1000);
    }
  }, [time, isPlay]);

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
            <Typography>280</Typography>
          </div>
          <Button variant="contained" onClick={handlePlay}>
            Играть
          </Button>
          <Button variant="contained" onClick={handleIsSound}>
            {isSound ? 'выключить звук' : 'включить звук'}
          </Button>
          <Button variant="contained" onClick={increaseCorrectCount}>
            Увеличить число ответов
          </Button>
          <Parrots correctAnswersCount={correctAnswersCount} />
          <TickPannel correctAnswersCount={correctAnswersCount} />
        </div>
      </div>
    </div>
  );
};

export default GameSprintLevel;
