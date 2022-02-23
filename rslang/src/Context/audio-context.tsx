/* eslint-disable no-console */
import React, { FC, useReducer } from 'react';
import {
  normalQuestions,
  shuffleAnswers,
  TBackendQuestion,
} from '../General/Function-helpers';
import { TWord } from '../api/types';

export type TAppState = {
  state: TReducerState;
  dispatch: React.Dispatch<TReducerAction>;
};

const initialState: TReducerState = {
  questions: [],
  currentQuestionIndex: 0,
  showResults: false,
  answers: [],
  currentAnswer: '',
  correctAnswerCount: 0,
  correctWords: [],
  wrongWords: [],
  correctWord: false,
  wrongAnswerCount: 0,
  maxSeries: 0,
};

export type TQuestion = {
  question: string;
  correctAnswer: string;
  incorrectAnswers: string[];
  word: string;
  audioExample: string;
  audioMeaning: string;
  group: number;
  id: string;
  image: string;
  page: number;
  textExample: string;
  textExampleTranslate: string;
  textMeaning: string;
  textMeaningTranslate: string;
  transcription: string;
};

export type TReducerState = {
  questions: TQuestion[];
  currentQuestionIndex: number;
  showResults: boolean;
  answers: string[];
  currentAnswer: string;
  correctAnswerCount: number;
  correctWords: TWord[];
  wrongWords: TWord[];
  correctWord: boolean;
  wrongAnswerCount: number;
  maxSeries: number;
};

type TReducerAction =
  | {
      type: 'SELECT_ANSWER';
      payload: string;
    }
  | { type: 'NEXT_QUESTION'; payload: string }
  | { type: 'RESTART'; payload: string }
  | { type: 'LOADING_BASE'; payload: TBackendQuestion[] };

const reducer = (state: TReducerState, action: TReducerAction) => {
  switch (action.type) {
    case 'SELECT_ANSWER': {
      const wordQuestion = {
        wordTranslate:
          state.questions[state.currentQuestionIndex].correctAnswer,
        word: state.questions[state.currentQuestionIndex].word,
        audio: state.questions[state.currentQuestionIndex].question,
        audioExample: state.questions[state.currentQuestionIndex].audioExample,
        audioMeaning: state.questions[state.currentQuestionIndex].audioMeaning,
        group: state.questions[state.currentQuestionIndex].group,
        id: state.questions[state.currentQuestionIndex].id,
        image: state.questions[state.currentQuestionIndex].image,
        page: +state.questions[state.currentQuestionIndex].page,
        textExample: state.questions[state.currentQuestionIndex].textExample,
        textExampleTranslate:
          state.questions[state.currentQuestionIndex].textExampleTranslate,
        textMeaning: state.questions[state.currentQuestionIndex].textMeaning,
        textMeaningTranslate:
          state.questions[state.currentQuestionIndex].textMeaningTranslate,
        transcription:
          state.questions[state.currentQuestionIndex].transcription,
      };
      const correctWords =
        action.payload ===
        state.questions[state.currentQuestionIndex].correctAnswer
          ? state.correctWords.concat(wordQuestion)
          : state.correctWords;
      const wrongWords =
        action.payload ===
        state.questions[state.currentQuestionIndex].correctAnswer
          ? state.wrongWords
          : state.wrongWords.concat(wordQuestion);
      const correctAnswerCount =
        action.payload ===
        state.questions[state.currentQuestionIndex].correctAnswer
          ? state.correctAnswerCount + 1
          : state.correctAnswerCount;
      const wrongAnswerCount =
        action.payload ===
        state.questions[state.currentQuestionIndex].correctAnswer
          ? state.wrongAnswerCount
          : state.wrongAnswerCount + 1;
      const correctWord =
        action.payload ===
        state.questions[state.currentQuestionIndex].correctAnswer;
      const maxSeries =
        action.payload ===
        state.questions[state.currentQuestionIndex].correctAnswer
          ? state.maxSeries + 1
          : 0;
      return {
        ...state,
        correctWords,
        wrongWords,
        currentAnswer: action.payload,
        correctAnswerCount,
        correctWord,
        wrongAnswerCount,
        maxSeries,
      };
    }
    case 'NEXT_QUESTION': {
      const showResults =
        state.currentQuestionIndex === state.questions.length - 1;
      const currentQuestionIndex = showResults
        ? state.currentQuestionIndex
        : state.currentQuestionIndex + 1;
      const answers = showResults
        ? []
        : shuffleAnswers(state.questions[currentQuestionIndex]);
      return {
        ...state,
        currentQuestionIndex,
        showResults,
        answers,
        currentAnswer: '',
      };
    }
    case 'RESTART': {
      return initialState;
    }
    case 'LOADING_BASE': {
      const normalBase = normalQuestions(action.payload);
      return {
        ...state,
        questions: normalBase,
        answers: shuffleAnswers(normalBase[0]),
      };
    }
    default: {
      return state;
    }
  }
};

export const AppContext = React.createContext<TAppState>({
  state: initialState,
  dispatch: () => {},
});

export const AppProvider: FC = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <AppContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
