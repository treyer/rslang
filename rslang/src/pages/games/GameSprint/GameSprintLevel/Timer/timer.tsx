import { useEffect } from 'react';
import { Typography } from '@mui/material';
import { TTime } from '../../../../../General/types';
import './timer.scss';

const Timer = ({ time, isSound, isPlay }: TTime) => {
  useEffect(() => {
    if (isSound && isPlay) {
      if (time !== 0) {
        const soundTick = new Audio('/assets/audio/tick-sound.mp3');
        soundTick.play();
      } else {
        const soundEnd = new Audio('/assets/audio/round-end-sound.mp3');
        soundEnd.play();
      }
    }
  }, [time, isSound, isPlay]);

  const getStyle = (): string => {
    if (time === 0) return 'circle10';
    if (time >= 1 && time < 7) return 'circle9';
    if (time >= 7 && time < 13) return 'circle8';
    if (time >= 13 && time < 19) return 'circle7';
    if (time >= 19 && time < 25) return 'circle6';
    if (time >= 25 && time < 31) return 'circle5';
    if (time >= 31 && time < 37) return 'circle4';
    if (time >= 37 && time < 43) return 'circle3';
    if (time >= 43 && time < 49) return 'circle2';
    if (time >= 49 && time < 54) return 'circle1';
    return 'circle0';
  };

  return (
    <div className={`circle ${getStyle()}`}>
      <div className="timer-number">
        <Typography variant="h3">{time}</Typography>
      </div>
    </div>
  );
};

export default Timer;
