import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';

import { TAuth, TUser, TUserBase, TUserWord, TWord } from './api/types';
import WordsApi from './api/wordsApi';
import UsersApi from './api/usersApi';
import UserWordsApi from './api/userWordsApi';
import { Sections } from './General/constants';
import Header from './Components/header/header';

import './App.css';

const refreshToken = '';
const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxZmMyZGVjZmU5YjdmMDAxNjU5ZDQ3YSIsImlhdCI6MTY0Mzk3ODU1NCwiZXhwIjoxNjQzOTkyOTU0fQ.BE-9t04UTt0b_B7yDkv0gqjFPt8mLyqnfIhnbaO5k2s';
const userId = '61fc2decfe9b7f001659d47a';
const wordId = '5e9f5ee35eb9e72bc21af66d';

function App() {
  /*  useEffect(() => {    
  WordsApi.getWords(2, 2, (data: TWord[]) => console.log(data));

    WordsApi.getWord('5e9f5ee35eb9e72bc21af714', (data: TWord) =>
      console.log(data),
    );
  }, []);

  useEffect(() => {
    /*  UsersApi.createUser(
      {
        name: 'string',
        email: 'stringggg@mail.ru',
        password: 'string123',
      },
      (dataUser: TUser) => console.log(dataUser),
    );  */

  /*  UsersApi.loginUser(
      {
        email: 'stringggg@mail.ru',
        password: 'string123',
      },
      (data: TUserBase) => console.log(data),
    );

    UsersApi.getUser(userId, token, (data: TUser) =>
      console.log('user: ', data),
    );

    /*  UsersApi.updateUser(
      '61fc2decfe9b7f001659d47a',
      token,
      {
        name: 'stringgg',
        email: 'stringggg@mail.ru',
        password: 'string123',
      },
      (data: TUser) => console.log('user: ', data),
    );  */

  /*  UsersApi.deleteUser(userId, token, () =>
      console.log('The user has been deleted'),
    );

    UsersApi.getNewUserToken(userId, refreshToken, (data: TAuth) =>
      console.log('token: ', data),
    );
  }, []);  */

  useEffect(() => {
    /*  UserWordsApi.getUserWords(userId, token, (data: TUserWord[]) =>
      console.log(data),
    );  */
    /* UserWordsApi.createUserWord(
      userId,
      wordId,
      token,
      {
        difficulty: 'hard',
        optional: {},
      },
      (data: TUserWord) => console.log('createdWord: ', data),
    );

    UserWordsApi.getUserWord(userId, wordId, token, (data: TUserWord) =>
      console.log(data),
    );
    /*  UserWordsApi.updateUserWord(
      userId,
      token,
      wordId,
      {
        difficulty: 'hard',
        optional: {},
      },
      (data: TUserWord) => console.log('updatedWord: ', data),
    );  */
    /*  UserWordsApi.deleteUserWord(userId, wordId, token, () =>
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
    </div>
  );
}

export default App;
