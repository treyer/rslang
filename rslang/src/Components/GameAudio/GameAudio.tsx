import { MouseEvent, useCallback, useState } from 'react';
import { Typography } from '@mui/material';
import { ENGLISH_LEVELS } from '../../General/constants';
import EnglishLevelButton from '../EnglishLevelButton/EnglishLevelButton';
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
        <p>В процессе игры вы можете использовать клавиши:</p>
        <p>
          <i style={{ color: 'burlywood' }}>1, 2, 3, 4, 5</i> - для выбора
          ответа
        </p>
        <p>
          <i style={{ color: 'burlywood' }}>пробел</i> - для повтроного звучания
          слова
        </p>
        <p>
          <i style={{ color: 'burlywood' }}>стрелка вправо → </i> - для перехода
          к следующему вопросу
        </p>
      </Typography>
    </div>
  );
};

export default GameAudio;
