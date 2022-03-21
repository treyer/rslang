/* eslint-disable no-console */
import * as React from 'react';
import Hotkeys from 'react-hot-keys';
import { useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Card, Typography } from '@mui/material';
import { AppContext } from '../../Context/audio-context';
import Question from '../GameAudioQuestion/Question';
import './GameAudioLevel.scss';
import { LoginContext } from '../../Context/login-context';
import {
  getGameWords,
  setGameStats,
  setPlayedWordStatus,
} from '../../General/game-utils';
import { WORDS_COUNT_FOR_AUDIO_GAME } from '../../General/constants';
import GameResults from '../GameResults/GameResults';
import { GameType } from '../../General/types';

const GameAudioLevel = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { userLoginData, setUserLogin } = useContext(LoginContext);
  const [isResultsModalOpen, setIsResultsModalOpen] = useState(false);
  const { state, dispatch } = React.useContext(AppContext);
  const {
    currentQuestionIndex,
    questions,
    correctAnswerCount,
    showResults,
    correctWords,
    wrongWords,
    correctWord,
    wrongAnswerCount,
    maxSeries,
  } = state;
  const scoreQuestion = currentQuestionIndex + 1;
  const allQuestions = questions.length;
  const currentQuestion = questions[currentQuestionIndex];

  useEffect(() => {
    if (showResults === true) {
      setIsResultsModalOpen(true);
      setGameStats(
        userLoginData.userId,
        userLoginData.token,
        GameType.audio,
        maxSeries + 1,
        correctAnswerCount,
        wrongAnswerCount,
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showResults]);

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

  const handleCloseResults = () => {
    setIsResultsModalOpen(false);
    dispatch({ type: 'RESTART', payload: '' });
    window.location.reload();
  };

  const handleKeyPress = (keyName: string, event: Event) => {
    event.preventDefault();
    if (keyName === 'right') {
      dispatch({ type: 'NEXT_QUESTION', payload: '' });
      NextQuestion();
      sendAnswer();
    }
  };

  const sendAnswer = () => {
    if (userLoginData.isLogined) {
      setPlayedWordStatus(
        userLoginData.userId,
        currentQuestion.id,
        userLoginData.token,
        correctWord,
      );
    }
  };

  return (
    <div className="App-games">
      <Hotkeys
        keyName="right"
        onKeyDown={(keyName, event) => {
          handleKeyPress(keyName, event);
        }}
      >
        <div className="games-audio-container">
          <div className="game-audio_quiz">
            {state.showResults && (
              <div
                className={`sprint-game-results-wrapper ${
                  isResultsModalOpen ? 'active' : ''
                }`}
              >
                <Card>
                  <div className="results-inner-wrapper">
                    <button
                      type="button"
                      className="results-inner-wrapper-close-btn"
                      onClick={() => {
                        handleCloseResults();
                      }}
                    >
                      <Typography variant="h4">❌</Typography>
                    </button>
                    <GameResults
                      correctCount={correctAnswerCount}
                      wrongCount={wrongAnswerCount}
                      correctWords={correctWords}
                      wrongWords={wrongWords}
                    />
                  </div>
                </Card>
              </div>
            )}
            {!showResults && questions.length > 0 && (
              <div>
                <div className="audio-cancel-wrapper">
                  <div className="audio-game_score">
                    {scoreQuestion} / {allQuestions}
                  </div>
                  <div className="audio-games-btn">
                    <div
                      className="audio-parrot-one"
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
                </div>

                <Question />
                <div
                  className="audio-btn_next"
                  onClick={() => {
                    dispatch({ type: 'NEXT_QUESTION', payload: '' });
                    NextQuestion();
                    sendAnswer();
                  }}
                >
                  Следующее слово
                </div>
              </div>
            )}
          </div>
        </div>
      </Hotkeys>
    </div>
  );
};

export default GameAudioLevel;
