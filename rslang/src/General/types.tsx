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
