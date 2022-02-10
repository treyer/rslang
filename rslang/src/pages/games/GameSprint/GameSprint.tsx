import { MouseEvent, useCallback, useState } from 'react';
import { Typography } from '@mui/material';
import LevelSprintButton from './LevelSprintButton/LevelSprintButton';
import { ENGLISH_LEVELS } from '../../textbook/consts';
import './GameSprint.scss';

type TGameId = keyof typeof ENGLISH_LEVELS;

const GameSprint = () => {
  const [activeGameId, setActiveGameId] = useState<TGameId>(0);

  const handleGameMini = useCallback(
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
    <div className="App-sprint">
      <Typography variant="h3" className="sprint_level-title">
        Выберите уровень сложности.
      </Typography>
      <div className="sprint_levels-list">
        <section className="sprint_level-list-section-button">
          {Object.values(ENGLISH_LEVELS).map(({ id, code }) => (
            <LevelSprintButton
              key={id}
              id={id}
              code={code}
              onHover={handleGameMini}
            />
          ))}
        </section>
      </div>
      <Typography variant="h4" className="sprint_level-title-control">
        <p>Используйте мышь, чтобы выбрать.</p>
        <p>Используйте клавиши влево или вправо.</p>
      </Typography>
    </div>
  );
};

export default GameSprint;
