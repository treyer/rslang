import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';

import { TAuth, TUser, TUserBase, TUserWord, TWord } from './api/types';
import WordsAPI from './api/wordsAPI';
import UsersAPI from './api/usersAPI';
import UserWordsAPI from './api/userWordsAPI';
import { Sections } from './General/constants';
import Header from './Components/header/header';
import Footer from './Components/footer/footer';

import './App.scss';

const refreshToken = '';
const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxZmQ3YjlhZDgyMjdjMDAxNmVjZjQ4OSIsImlhdCI6MTY0NDAwMjIwOCwiZXhwIjoxNjQ0MDE2NjA4fQ.hib2QlUqKd4C9gGcMgUnSyp_uDOx9ot-kwwDQc3T4Oc';
const userId = '61fd7b9ad8227c0016ecf489';
const wordId = '5e9f5ee35eb9e72bc21af66d';

function App() {
  /*  useEffect(() => {    
  WordsAPI.getWords(2, 2, (data: TWord[]) => console.log('words: ', data));

    WordsAPI.getWord('5e9f5ee35eb9e72bc21af714', (data: TWord) =>
      console.log('word: ', data),
    );
  }, []);  */

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
    /*  UsersAPI.updateUser(
      '61fc2decfe9b7f001659d47a',
      token,
      {
        name: 'stringgg',
        email: 'stringggg@mail.ru',
        password: 'string123',
      },
      (data: TUser) => console.log('user: ', data),
    );  */
    /*  UsersAPI.deleteUser(userId, token, () =>
      console.log('The user has been deleted'),
    );

    UsersAPI.getNewUserToken(userId, refreshToken, (data: TAuth) =>
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
      <Header />
      <Routes>
        {Sections.map((el) => (
          <Route key={el.id} path={el.routePath} element={el.element} />
        ))}
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
