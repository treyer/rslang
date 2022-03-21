import { Typography } from '@mui/material';
import { TWordResult } from '../../General/types';
import './ResultWord.scss';

const ResultWord = ({ word, wordTranslate, audioSrc }: TWordResult) => {
  const playAudio = () => {
    const sound = new Audio(`${process.env.REACT_APP_SERVER_URL}/${audioSrc}`);
    sound.play();
  };

  return (
    <div className="game-results-word-wrapper">
      <div
        className="game-results-word-play-music"
        style={{
          backgroundImage: `url(/assets/img/unmute.png)`,
        }}
        onClick={playAudio}
      />
      <Typography className="game-results-word-eng" variant="h5">
        {word}
      </Typography>
      <Typography variant="h5"> - </Typography>
      <Typography className="game-results-word-rus" variant="h6">
        {wordTranslate}
      </Typography>
    </div>
  );
};

export default ResultWord;
