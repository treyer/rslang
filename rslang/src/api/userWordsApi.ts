import { TUserWord } from './types';

export class UserWordsApi {
  url: string;

  constructor(url: string) {
    this.url = url;
  }

  getUserWords(
    userId: string,
    token: string,
    getUserWordsCb: (data: TUserWord[]) => void,
  ) {
    const promise = fetch(`${this.url}/users/${userId}/words`, {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    promise
      .then((result) => result.json())
      .then((result) => getUserWordsCb(result));
  }

  createUserWord(
    userId: string,
    wordId: string,
    token: string,
    dataWord: TUserWord,
    createUserWordCb: (data: TUserWord) => void,
  ) {
    const promise = fetch(`${this.url}/users/${userId}/words/${wordId}`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(dataWord),
    });
    promise
      .then((result) => result.json())
      .then((data) => createUserWordCb(data));
  }

  getUserWord(
    userId: string,
    wordId: string,
    token: string,
    getUserWordCb: (data: TUserWord) => void,
  ) {
    const promise = fetch(`${this.url}/users/${userId}/words/${wordId}`, {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    promise
      .then((result) => result.json())
      .then((result) => getUserWordCb(result));
  }

  updateUserWord(
    userId: string,
    token: string,
    wordId: string,
    dataWord: TUserWord,
    updateUserWordCb: (data: TUserWord) => void,
  ) {
    const promise = fetch(`${this.url}/users/${userId}/words/${wordId}`, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(dataWord),
    });
    promise
      .then((result) => result.json())
      .then((result) => updateUserWordCb(result));
  }

  deleteUserWord(
    userId: string,
    wordId: string,
    token: string,
    deleteUserWordCb: (id: string) => void,
  ) {
    const promise = fetch(`${this.url}/users/${userId}/words/${wordId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    promise
      .then((result) => {
        //  @todo use status code from http status code from package
        if (!result.ok && result.status !== 204) {
          throw new Error();
        }
      })
      .then(() => deleteUserWordCb(wordId))
      .catch((error) => {
        console.error(error);
      });
  }
}

export default new UserWordsApi(
  'https://react-learn-words-together.herokuapp.com',
);
