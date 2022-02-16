import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';

/*  import { TAuth, TUser, TUserBase, TUserWord, TWord } from './api/types';
import WordsAPI from './api/wordsAPI';
import UsersAPI from './api/usersAPI';
import UserWordsAPI from './api/userWordsAPI';  */
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

/*  const refreshToken = '';
const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxZmQ3YjlhZDgyMjdjMDAxNmVjZjQ4OSIsImlhdCI6MTY0NDA3OTIzNywiZXhwIjoxNjQ0MDkzNjM3fQ.6L_APiAIUedoDeMEELVYOafaqsnJlwSkpL7d4SbD6lo';
const userId = '61fd7b9ad8227c0016ecf489';
const wordId = '5e9f5ee35eb9e72bc21af66d';  */

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
            userId: data.userId,
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

  useEffect(() => {
    /*  WordsAPI.getWords(2, 2, (data: TWord[]) => console.log('words: ', data));

    WordsAPI.getWord(wordId, (data: TWord) => console.log('word: ', data));
  }, []);

  useEffect(() => {
    /*  UsersAPI.createUser(
      {
        name: 'string',
        email: 'stringggg@mail.ru',
        password: 'string123',
      },
      (dataUser: TUser) => console.log(dataUser),
    );  */
    /*  UsersAPI.loginUser(
      {
        email: 'stringggg@mail.ru',
        password: 'string123',
      },
      (data: TUserBase) => console.log(data),
    );  */
    /*  UsersAPI.getUser(userId, token, (data: TUser) =>
      console.log('user: ', data),
    );  */
    /* UsersAPI.updateUser(
      userId,
      token,
      {
        name: 'stringgg',
        email: 'stringggg@mail.ru',
        password: 'string123',
      },
      (data: TUser) => console.log('user: ', data),
    );
    UsersAPI.deleteUser(userId, token, () =>
      console.log('The user has been deleted'),
    );

    /*  UsersAPI.getNewUserToken(userId, refreshToken, (data: TAuth) =>
      console.log('token: ', data),
    );  */
  }, []);

  useEffect(() => {
    /*  UserWordsAPI.getUserWords(userId, token, (data: TUserWord[]) =>
      console.log(data),
    );  */
    /*  UserWordsAPI.createUserWord(
      userId,
      wordId,
      token,
      {
        difficulty: 'hard',
        optional: {},
      },
      (data: TUserWord) => console.log('createdWord: ', data),
    );  */
    /*  UserWordsAPI.getUserWord(userId, wordId, token, (data: TUserWord) =>
      console.log(data),
    );  */
    /*  UserWordsAPI.updateUserWord(
      userId,
      token,
      wordId,
      {
        difficulty: 'hard',
        optional: {},
      },
      (data: TUserWord) => console.log('updatedWord: ', data),
    );  */
    /*  UserWordsAPI.deleteUserWord(userId, wordId, token, () =>
      console.log('The word has been deleted'),
    );  */
  }, []);

  return (
    <div className="App">
      <LoginContext.Provider value={value}>
        <Header />
        <Routes>
          {ROUTES.map((el) => (
            <Route key={el.id} path={el.routePath} element={el.element} />
          ))}
        </Routes>
        <Footer />
      </LoginContext.Provider>
    </div>
  );
}

export default App;
