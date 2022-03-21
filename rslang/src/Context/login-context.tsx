import { createContext } from 'react';
import { TAppState } from '../General/types';

export const LoginContext = createContext<TAppState>({
  userLoginData: {
    isLogined: false,
    token: '',
    refreshToken: '',
    userId: '',
    userName: '',
    isLoginOpen: false,
    isRegisterOpen: false,
    pageForGames: -1,
  },
  setUserLogin: () => {},
});
