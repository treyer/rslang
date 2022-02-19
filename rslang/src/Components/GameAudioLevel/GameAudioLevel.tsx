import * as React from 'react';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { TWord } from '../../api/types';
import { AppContext } from '../../Context/audio-context';
import Question from '../GameAudioQuestion/Question';
import WordsAPI from '../../api/wordsAPI';
import './GameAudioLevel.scss';

const GameAudioLevel = () => {
  const location = useLocation();
  const lengthLocation = location.pathname.split('/').length;
  const groupLevel = +location.pathname.split('/')[lengthLocation - 1];
  const [currPage] = useState(1);
  const { state, dispatch } = React.useContext(AppContext);
  const { currentQuestionIndex, questions, correctAnswerCount, showResults } =
    state;
  const scoreQuestion = currentQuestionIndex + 1;
  const allQuestions = questions.length;
  useEffect(() => {
    const page = currPage - 1;
    WordsAPI.getWords(page, groupLevel, (data: TWord[]) =>
      dispatch({ type: 'LOADING_BASE', payload: data }),
    );
  }, [currPage, location.pathname, groupLevel, dispatch]);

  return (
    <div className="App-games">
      <div className="games-container">
        <div className="game-audio_quiz">
          {state.showResults && (
            <div className="game-audio_results">
              <div className="results-congratulations">Результаты</div>
              <div className="results-info">
                <h4>Вы закончили игру с результатом:</h4>
                <p>
                  правильныx ответов {correctAnswerCount} из {questions.length}
                </p>
              </div>
              <div
                className="audio-restart_button"
                onClick={() => dispatch({ type: 'RESTART', payload: '' })}
              >
                Начать заново.
              </div>
            </div>
          )}
          {!showResults && questions.length > 0 && (
            <div>
              <div className="audio-game_score">
                {scoreQuestion} / {allQuestions}
              </div>
              <Question />
              <div
                className="audio-btn_next"
                onClick={() => {
                  dispatch({ type: 'NEXT_QUESTION', payload: '' });
                }}
              >
                Next
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GameAudioLevel;
