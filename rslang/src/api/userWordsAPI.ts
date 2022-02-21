/* eslint-disable @typescript-eslint/no-unused-vars */
import { BaseAPI } from './baseAPI';
import { TUserWord } from './types';
import { USER_WORDS_API_ERRORS } from './errors';

class UserWordsAPI extends BaseAPI {
  getUserWords(
    userId: string,
    token: string,
    getUserWordsCb: (data: TUserWord[]) => void,
  ) {
    this.get(`users/${userId}/words`, { Authorization: `Bearer ${token}` })
      .then((result) => {
        BaseAPI.handleError(result, USER_WORDS_API_ERRORS);
        return result.json();
      })
      .then((result) => getUserWordsCb(result))
      .catch((error) => {
        console.error(error);
      });
  }

  createUserWord(
    userId: string,
    wordId: string,
    token: string,
    dataWord: TUserWord,
    createUserWordCb = (_result: TUserWord) => {},
  ) {
    this.post(`users/${userId}/words/${wordId}`, dataWord, {
      Authorization: `Bearer ${token}`,
    })
      .then((result) => {
        BaseAPI.handleError(result, USER_WORDS_API_ERRORS);
        return result.json();
      })
      .then((data) => createUserWordCb(data))
      .catch((error) => {
        console.error(error);
      });
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
      .then((result) => {
        BaseAPI.handleError(result, USER_WORDS_API_ERRORS);
        return result.json();
      })
      .then((result) => getUserWordCb(result))
      .catch((error) => {
        console.error(error);
      });
  }

  updateUserWord(
    userId: string,
    token: string,
    wordId: string,
    dataWord: TUserWord,

    updateUserWordCb = (_result: TUserWord) => {},
  ) {
    return this.put(`users/${userId}/words/${wordId}`, dataWord, {
      Authorization: `Bearer ${token}`,
    })
      .then((result) => {
        BaseAPI.handleError(result, USER_WORDS_API_ERRORS);
        return result.json();
      })
      .then((result) => updateUserWordCb(result))
      .catch((error) => {
        console.error(error);
      });
  }

  deleteUserWord(
    userId: string,
    wordId: string,
    token: string,
    deleteUserWordCb = (deletedWordId: string) => {},
  ) {
    this.delete(`users/${userId}/words/${wordId}`, {
      Authorization: `Bearer ${token}`,
    })
      .then((result) => {
        BaseAPI.handleError(result, USER_WORDS_API_ERRORS);
      })
      .then(() => deleteUserWordCb(wordId))
      .catch((error) => {
        console.error(error);
      });
  }
}

export default new UserWordsAPI();
