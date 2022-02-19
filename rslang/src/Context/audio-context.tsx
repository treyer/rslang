import React, { FC, useReducer } from 'react';
import {
  normalQuestions,
  shuffleAnswers,
  TBackendQuestion,
} from '../General/Function-helpers';

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
};

export type TQuestion = {
  question: string;
  correctAnswer: string;
  incorrectAnswers: string[];
};

export type TReducerState = {
  questions: TQuestion[];
  currentQuestionIndex: number;
  showResults: boolean;
  answers: string[];
  currentAnswer: string;
  correctAnswerCount: number;
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
      const correctAnswerCount =
        action.payload ===
        state.questions[state.currentQuestionIndex].correctAnswer
          ? state.correctAnswerCount + 1
          : state.correctAnswerCount;
      return {
        ...state,
        currentAnswer: action.payload,
        correctAnswerCount,
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
