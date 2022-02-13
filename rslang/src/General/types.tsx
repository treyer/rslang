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
  isLoginOpen: boolean;
  isRegisterOpen: boolean;
};

export type TAppState = {
  userLoginData: TUserLogin;
  setUserLogin: (userLoginData: TUserLogin) => void;
};
