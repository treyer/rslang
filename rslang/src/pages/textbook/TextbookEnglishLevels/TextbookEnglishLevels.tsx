import React, { MouseEvent, useCallback, useState } from 'react';
import { Typography } from '@mui/material';
import { ENGLISH_LEVELS } from '../../../General/constants';
import EnglishLevelButton from '../../../Components/EnglishLevelButton/EnglishLevelButton';
import TextbookLevelInformation from '../components/TextbookLevelInfomation/TextbookLevelInformation';
import './TextbookEnglishLevels.scss';

type TLevelId = keyof typeof ENGLISH_LEVELS;

const TextbookEnglishLevels = () => {
  const [activeLevelId, setActiveLevelId] = useState<TLevelId>(0);

  const handleLevelHover = useCallback((e: MouseEvent) => {
    const target = e.target as HTMLElement;
    if (!target) {
      return;
    }
    const activeId = target.id as unknown as TLevelId;
    setActiveLevelId(activeId);
  }, []);

  return (
    <div className="App-textbook">
      <Typography variant="h3" className="textbook_level-title">
        Выбери уровень для изучения
      </Typography>
      <div className="textbook_levels-list">
        <section className="textbook_level-list-section-button">
          {Object.values(ENGLISH_LEVELS).map(({ id, code, level }) => (
            <EnglishLevelButton
              path="/textbook/words/"
              key={id}
              id={id}
              code={code}
              level={level}
              onHover={handleLevelHover}
            />
          ))}
        </section>
        {ENGLISH_LEVELS[activeLevelId] && (
          <TextbookLevelInformation
            img={ENGLISH_LEVELS[activeLevelId].img}
            text={ENGLISH_LEVELS[activeLevelId].text}
          />
        )}
      </div>
    </div>
  );
};

export default TextbookEnglishLevels;
