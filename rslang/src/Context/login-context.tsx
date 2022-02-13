import { createContext } from 'react';
import { TAppState } from '../General/types';

export const LoginContext = createContext<TAppState>({
  userLoginData: {
    isLogined: false,
    token: '',
    refreshToken: '',
    userId: '',
    isLoginOpen: false,
    isRegisterOpen: false,
  },
  setUserLogin: () => {},
});
