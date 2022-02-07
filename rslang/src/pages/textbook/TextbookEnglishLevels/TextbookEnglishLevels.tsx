import React, { MouseEvent, useState } from 'react';
import { Typography } from '@mui/material';

import { ENGLISH_LEVELS } from '../consts';
import { EnglishLevelButton } from '../components/EnglishLevelButton/EnglishLevelButton';

import './TextbookEnglishLevels.scss';
import { TextbookLevelInformation } from '../components/TextbookLevelInfomation/TextbookLevelInformation';

type TLevelId = keyof typeof ENGLISH_LEVELS;

const TextbookEnglishLevels = () => {
  const [activeLevel, satActiveLevel] = useState<TLevelId>(0);

  const handleLevelHover = (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    if (!target) {
      return;
    }
    const activeLevelId = target.id as unknown as TLevelId;
    satActiveLevel(activeLevelId);
    console.error(e);
  };

  return (
    <div className="App-textbook">
      <Typography variant="h3">Выбери уровень для изучения</Typography>
      <div className="textbook_levels-list">
        <section className="textbook_level-list-section-button">
          {Object.values(ENGLISH_LEVELS).map(({ id, code, level }) => (
            <EnglishLevelButton
              key={id}
              id={id}
              code={code}
              level={level}
              onHover={handleLevelHover}
            />
          ))}
        </section>
        <TextbookLevelInformation
          img={ENGLISH_LEVELS[activeLevel].img}
          text={ENGLISH_LEVELS[activeLevel].text}
        />
      </div>
    </div>
  );
};

export default TextbookEnglishLevels;
