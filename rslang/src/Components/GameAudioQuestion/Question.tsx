import { CardActions, IconButton } from '@mui/material';
import * as React from 'react';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import { AppContext } from '../../Context/audio-context';
import { SERVER_URL } from '../../consts';
import Answer from '../GameAudioAnswer/Answer';

const Question = () => {
  const { state, dispatch } = React.useContext(AppContext);
  const { currentQuestionIndex, questions, currentAnswer } = state;
  const currentQuestion = questions[currentQuestionIndex];
  return (
    <div className="audio-question-container">
      <div className="audio-question">
        <CardActions>
          <IconButton
            className="audio-element"
            aria-label="volume"
            onClick={() => {
              const audio = new Audio();
              audio.src = `${SERVER_URL}/${currentQuestion.question}`;
              audio.play();
            }}
          >
            <VolumeUpIcon className="audio-element_icon" />
          </IconButton>
        </CardActions>
      </div>
      <div className="audio-answers">
        {state.answers.map((answer, index: number) => (
          <Answer
            key={answer}
            index={index}
            answerText={answer}
            correctAnswer={currentQuestion.correctAnswer}
            currentAnswer={currentAnswer}
            onSelectAnswer={(answerText: string) =>
              dispatch({ type: 'SELECT_ANSWER', payload: answerText })
            }
          />
        ))}
      </div>
    </div>
  );
};

export default Question;
