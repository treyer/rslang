import { MouseEvent, useCallback, useState } from 'react';
import { Typography } from '@mui/material';
import { ENGLISH_LEVELS } from '../../General/constants';
import EnglishLevelButton from '../EnglishLevelButton/EnglishLevelButton';
import BranchParrot from '../BranchParrot/BranchParrot';
import './GameAudio.scss';

type TGameId = keyof typeof ENGLISH_LEVELS;

const GameAudio = () => {
  const [activeGameId, setActiveGameId] = useState<TGameId>(0);

  const handleGameLevel = useCallback(
    (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) {
        return;
      }
      const activeId = activeGameId as TGameId;
      setActiveGameId(activeId);
    },
    [activeGameId],
  );

  return (
    <div className="App-audio">
      <Typography variant="h3" className="audio_level-title">
        Выберите уровень сложности.
      </Typography>
      <div className="audio_levels-list">
        <section className="audio_level-list-section-button">
          {Object.values(ENGLISH_LEVELS).map(({ id, code }) => (
            <EnglishLevelButton
              path="/games/audio/"
              key={id}
              id={id}
              code={code}
              level=""
              onHover={handleGameLevel}
            />
          ))}
        </section>
      </div>
      <Typography variant="h4" className="audio_level-title-control">
        <p>Используйте мышь, чтобы выбрать ответ.</p>
        <p>Используйте цифровые клавиши от 1 до 5 для выбора ответа</p>
        <p>Используйте пробел для повтроного звучания слова</p>
      </Typography>
      <BranchParrot />
    </div>
  );
};

export default GameAudio;
