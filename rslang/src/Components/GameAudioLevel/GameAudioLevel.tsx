import * as React from 'react';
import { useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Typography } from '@mui/material';
import { TWord } from '../../api/types';
import { AppContext } from '../../Context/audio-context';
import Question from '../GameAudioQuestion/Question';
import WordsAPI from '../../api/wordsAPI';
import './GameAudioLevel.scss';
import { LoginContext } from '../../Context/login-context';
import { getGameWords } from '../../General/game-utils';
import { WORDS_COUNT_FOR_AUDIO_GAME } from '../../General/constants';

const GameAudioLevel = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const lengthLocation = location.pathname.split('/').length;
  const groupLevel = +location.pathname.split('/')[lengthLocation - 1];
  const { userLoginData, setUserLogin } = useContext(LoginContext);
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

  useEffect(() => {
    const pathArr = location.pathname.split('/');
    const page = userLoginData.pageForGames;
    if (page !== -1) {
      setUserLogin({
        ...userLoginData,
        pageForGames: -1,
      });
    }
    getGameWords(
      page,
      Number(pathArr[pathArr.length - 1]),
      WORDS_COUNT_FOR_AUDIO_GAME,
    ).then((data) => {
      dispatch({ type: 'LOADING_BASE', payload: data });
    });
  }, [dispatch, location.pathname, setUserLogin, userLoginData]);

  const NextQuestion = () => {
    const audio = new Audio();
    audio.src = '/assets/audio/tick-sound.mp3';
    audio.play();
  };

  const handleReturnGames = () => {
    navigate('/games', { replace: true });
  };
  const handleReturnWords = () => {
    navigate('/textbook/words/0', { replace: true });
  };

  return (
    <div className="App-games">
      <div className="games-audio-container">
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
              <div className="audio-cancel-wrapper">
                <div
                  className="branch"
                  style={{
                    backgroundImage: `url(/assets/img/branch.png)`,
                  }}
                />
                <div
                  className="parrot-1"
                  style={{
                    backgroundImage: `url(/assets/img/parrot-1.png)`,
                  }}
                />
                <div className="cancel-audio-game-btn">
                  <button
                    type="button"
                    className="cancel-game-btn"
                    onClick={handleReturnGames}
                  >
                    <Typography variant="h5">Игры</Typography>
                  </button>
                  <button
                    type="button"
                    className="cancel-game-btn"
                    onClick={handleReturnWords}
                  >
                    <Typography variant="h5">Учебник</Typography>
                  </button>
                </div>
              </div>
              <div className="audio-game_score">
                {scoreQuestion} / {allQuestions}
              </div>
              <Question />
              <div
                className="audio-btn_next"
                onClick={() => {
                  dispatch({ type: 'NEXT_QUESTION', payload: '' });
                  NextQuestion();
                }}
              >
                Следующее слово
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GameAudioLevel;
