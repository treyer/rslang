export type TAPIErrorsMap = {
  [key: number]: string;
};

export type TWord = {
  _id?: string;
  id: string;
  group: number;
  page: number;
  word: string;
  image: string;
  audio: string;
  audioMeaning: string;
  audioExample: string;
  textMeaning: string;
  textExample: string;
  transcription: string;
  wordTranslate: string;
  textMeaningTranslate: string;
  textExampleTranslate: string;
  userWord?: {
    optional?: TOptionalUserWord;
  };
};

export type TUser = TUserBase & {
  name: string;
};

export type TUserBase = {
  email: string;
  password: string;
};

export type TLoginRequest = {
  email: string;
  password: string;
};

export type TAuth = {
  message: string;
  token: string;
  refreshToken: string;
  userId: string;
  name: string;
};

export type TUserWord = {
  difficulty: string;
  optional?: TOptionalUserWord;
};

export type TOptionalUserWord = {
  deleted?: boolean;
  isDifficult?: boolean;
  failCounter?: number;
  successCounter?: number;
  correctAnswer?: number;
  group?: number;
  page?: number;
};

export type TStatistic = {
  learnedWords: number;
  optional: TOptionalStatistic;
};

export type TOptionalStatistic = {
  bestSeries?: number;
  audioCall?: {
    rightAnswers?: number;
    wrongAnswers?: number;
  };
  sprint?: {
    rightAnswers?: number;
    wrongAnswers?: number;
  };
};

export type TSetting = {
  wordsPerDay: number;
  optional: object;
};
