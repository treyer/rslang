import { BaseAPI } from './baseAPI';
import { TUserWord } from './types';

export class UserWordsAPI extends BaseAPI {
  getUserWords(
    userId: string,
    token: string,
    getUserWordsCb: (data: TUserWord[]) => void,
  ) {
    this.get(`users/${userId}/words`, { Authorization: `Bearer ${token}` })
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
    this.post(`users/${userId}/words/${wordId}`, dataWord, {
      Authorization: `Bearer ${token}`,
    })
      .then((result) => result.json())
      .then((data) => createUserWordCb(data));
  }

  getUserWord(
    userId: string,
    wordId: string,
    token: string,
    getUserWordCb: (data: TUserWord) => void,
  ) {   
    this.get(`users/${userId}/words/${wordId}`, {
      Authorization: `Bearer ${token}`,
    })
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
    this.put(`users/${userId}/words/${wordId}`, dataWord, {
      Authorization: `Bearer ${token}`,
    })
      .then((result) => result.json())
      .then((result) => updateUserWordCb(result));
  }

  deleteUserWord(
    userId: string,
    wordId: string,
    token: string,
    deleteUserWordCb: (id: string) => void,
  ) {    
    this.delete(`users/${userId}/words/${wordId}`, {
      Authorization: `Bearer ${token}`,
    })
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

export default new UserWordsAPI();
