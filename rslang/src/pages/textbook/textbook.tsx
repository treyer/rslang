import { Button, Typography } from '@mui/material';
import React, { MouseEvent, useState } from 'react';

import './textbook.scss';

import { ENGLISH_LEVELS } from './consts';

type TLevelId = '0' | '1' | '2' | '3' | '4' | '5';

const Textbook = () => {
  const [activeLevel, satActiveLevel] = useState<TLevelId>('0');
  const handleLevelHover = (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    const activeLevelId = target.id as TLevelId;
    satActiveLevel(activeLevelId);
    console.error(e);
  };

  return (
    <div className="App-textbook">
      <Typography variant="h3">Уровни сложности</Typography>
      <div className="textbook_levels-list">
        <section className="textbook_level-list-section-button">
          {Object.values(ENGLISH_LEVELS).map((level) => (
            <Button
              id={level.id}
              key={level.id}
              variant="contained"
              className={`textbook_btn textbook_button-${level.id}`}
              onMouseEnter={handleLevelHover}
            >
              <span className="textbook_code-title">{level.code}</span>
              <span className="textbook_level-title">{level.level}</span>
            </Button>
          ))}
        </section>
        <section className="textbook_level-list-section-inform">
          <img
            src={ENGLISH_LEVELS[activeLevel].img}
            alt="Elementary"
            className="textbook_img"
          />
          <p className="textbook_level-list-text">
            {ENGLISH_LEVELS[activeLevel].text}
          </p>
        </section>
      </div>
    </div>
  );
};

export default Textbook;
