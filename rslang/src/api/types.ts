export type TWord = {
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
};

export type TUser = {
  name: string;
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
  optional: TOptionalUserWord;
};

export type TOptionalUserWord = {
  deleted?: boolean;
  failCounter?: number;
  group?: number;
  page?: number;
  successCounter?: number;
};

export type TStatistic = {
  learnedWords: number;
  optional: TOptionalStatistic;
};

export type TOptionalStatistic = {
  savannah?: string;
  sprint?: string;
};

export type TSetting = {
  wordsPerDay: number;
  optional: object;
};
