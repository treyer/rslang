import { TWord } from '../api/types';

export type TPath = {
  id: number;
  routePath: string;
  title: string;
  element: JSX.Element;
};

export type TUserLogin = {
  isLogined: boolean;
  token: string;
  refreshToken: string;
  userId: string;
  userName: string;
  isLoginOpen: boolean;
  isRegisterOpen: boolean;
  pageForGames: number;
};

export type TAppState = {
  userLoginData: TUserLogin;
  setUserLogin: (userLoginData: TUserLogin) => void;
};

export type TTime = {
  time: number;
  isSound: boolean;
  isPlay: boolean;
};

export type TCorrectAnsCount = {
  correctAnswersCount: number;
};

export type TTickStatus = {
  status: boolean;
};

// eslint-disable-next-line no-shadow
export enum ExtraPoints {
  twentyPoints = '+20 очков за слово',
  fortyPoints = '+40 очков за слово',
  eightyPoints = '+80 очков за слово',
}

export type TWordResult = {
  word: string;
  wordTranslate: string;
  audioSrc: string;
};

export type THeaderResult = {
  headerName: string;
  headerValue: number;
  headerType: HeaderType;
};

// eslint-disable-next-line no-shadow
export enum HeaderType {
  correct,
  wrong,
}

export type TGameResults = {
  correctCount: number;
  wrongCount: number;
  correctWords: TWord[];
  wrongWords: TWord[];
};
