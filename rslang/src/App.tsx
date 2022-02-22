import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';

import { ROUTES } from './General/constants';
import Footer from './Components/footer/footer';
import Header from './Components/header/header';
import { LoginContext } from './Context/login-context';

import './App.scss';
import UsersAPI from './api/usersAPI';
import {
  clearUserLoginInLocalStorage,
  setUserLoginToLocalStorage,
} from './General/utils';
import { AppProvider } from './Context/audio-context';

function App() {
  const [userLoginData, setUserLogin] = useState({
    isLogined: false,
    token: '',
    refreshToken: '',
    userId: '',
    userName: '',
    isLoginOpen: false,
    isRegisterOpen: false,
    pageForGames: -1,
  });
  const value = { userLoginData, setUserLogin };

  useEffect(() => {
    const token = localStorage.getItem('token');
    const refreshToken = localStorage.getItem('refreshToken');
    const userId = localStorage.getItem('userId');
    const userName = localStorage.getItem('userName');

    if (token && refreshToken && userId && userName) {
      UsersAPI.getNewUserToken(userId, refreshToken, (errorMess, data) => {
        if (errorMess) {
          clearUserLoginInLocalStorage();
        } else if (data) {
          setUserLogin({
            isLogined: true,
            token: data.token,
            refreshToken: data.refreshToken,
            userId,
            userName,
            isLoginOpen: false,
            isRegisterOpen: false,
            pageForGames: -1,
          });
          setUserLoginToLocalStorage(
            data.token,
            data.refreshToken,
            userId,
            userName,
          );
        }
      });
    }
  }, []);

  return (
    <div className="App">
      <LoginContext.Provider value={value}>
        <Header />
        <AppProvider>
          <Routes>
            {ROUTES.map((el) => (
              <Route key={el.id} path={el.routePath} element={el.element} />
            ))}
          </Routes>
        </AppProvider>
        <Footer />
      </LoginContext.Provider>
    </div>
  );
}

export default App;
