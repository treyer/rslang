import { useEffect, useState } from 'react';
import { Button } from '@mui/material';

import Timer from './Timer/timer';

const GameSprintLevel = () => {
  const [time, setTime] = useState(60);
  const [isSound, setIsSound] = useState(true);
  const [isPlay, setIsPlay] = useState(false);

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

  return (
    <div className="App-games">
      <div className="games-container">
        <Timer time={time} isSound={isSound} isPlay={isPlay} />
        <Button variant="contained" onClick={handlePlay}>
          Играть
        </Button>
        <Button variant="contained" onClick={handleIsSound}>
          {isSound ? 'выключить звук' : 'включить звук'}
        </Button>
      </div>
    </div>
  );
};

export default GameSprintLevel;
