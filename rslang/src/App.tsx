import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';

import { TAuth, TUser, TUserBase, TWord } from './api/types';
import WordsApi from './api/wordsApi';
import UsersApi from './api/usersApi';
import { Sections } from './General/constants';
import Header from './Components/header/header';

import './App.css';

function App() {
  useEffect(() => {
    WordsApi.getWords(2, 2, (data: TWord[]) => console.log(data));
  }, []);

  useEffect(() => {
    WordsApi.getWord('5e9f5ee35eb9e72bc21af714', (data: TWord) =>
      console.log(data),
    );
  }, []);

  useEffect(() => {
    UsersApi.createUser(
      {
        name: 'string',
        email: 'stringggg@mail.ru',
        password: 'string123',
      },
      (dataUser: TUser) => console.log(dataUser),
    );
  }, []);

  useEffect(() => {
    UsersApi.loginUser(
      {
        email: 'stringggg@mail.ru',
        password: 'string123',
      },
      (data: TUserBase) => console.log(data),
    );
  }, []);

  useEffect(() => {
    UsersApi.getUser('61fc2decfe9b7f001659d47a', (data: TUser) =>
      console.log('user: ', data),
    );

    UsersApi.updateUser(
      '61fc2decfe9b7f001659d47a',
      {
        name: 'stringgg',
        email: 'stringggg@mail.ru',
        password: 'string123',
      },
      (data: TUser) => console.log('user: ', data),
    );

    /*  UsersApi.deleteUser('61fc033a4f8a8900160e3159', () =>
      console.log('The user has been deleted'),
    );  */

    UsersApi.getNewUserToken('61fc2decfe9b7f001659d47a', (data: TAuth) =>
      console.log('token: ', data),
    );
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
