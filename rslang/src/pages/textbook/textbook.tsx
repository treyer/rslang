import { Button, Typography } from '@mui/material';
import React from 'react';

import './textbook.scss';

import { ENGLISH_LEVELS } from './consts';

const Textbook = () => {
  return (
    <div className="App-textbook">
      <Typography variant="h3">Уровни сложности</Typography>
      <div className="textbook_levels-list">
        <section className="textbook_level-list-section-button">
          {ENGLISH_LEVELS.map((level) => (
            <Button
              variant="contained"
              className={`textbook_btn textbook_button-${level.levelId}`}
            >
              <span className="textbook_code-title">{level.code}</span>
              <span className="textbook_level-title">{level.level}</span>
            </Button>
          ))}
        </section>
        <section className="textbook_level-list-section-inform">
          <img src="" alt="" />
          <p className="textbook_level-list-text">Элементрарный уровень</p>
          <p className="textbook_level-list-text">
            На этом уровне вы можете понимать употребительные выражения на общие
            темы, такие как: семья, покупки, работа и др. Разговаривать на
            простые повседневные темы, выражаясь простыми фразами. Рассказать
            простыми выражениями о себе, описывать простые ситуации.
            Телепередачи на английском не будут понятны, разве что отдельные
            слова, но собеседника, если он будет говорить отчетливо, простыми
            фразами в 2-3 слова в общем поймете.Уровень Elementary можно назвать
            «уровнем для выживания», Survival English. Его достаточно для того,
            чтобы «выжить» во время поездки в страну, где основной язык
            английский.
          </p>
        </section>
      </div>
    </div>
  );
};

export default Textbook;
