import { BaseAPI } from './baseAPI';
import { TWord } from './types';
import { WORDS_API_ERRORS } from './errors';

class WordsAPI extends BaseAPI {
  getWords(
    page: number,
    group: number,
    getWordsCb: (data: TWord[]) => void,
    finallyCb = () => {},
    errorCb = (_error: Error) => {
      console.error(_error);
    },
  ) {
    this.get(`words?page=${page}&group=${group}`)
      .then((result) => {
        BaseAPI.handleError(result, WORDS_API_ERRORS);
        return result.json();
      })
      .then((data) => getWordsCb(data))
      .catch((error) => errorCb(error))
      .finally(() => finallyCb());
  }

  getWord(
    wordId: string,
    getWordCb: (data: TWord) => void,
    errorCb = (_error: Error) => {
      console.error(_error);
    },
  ) {
    this.get(`words/${wordId}`)
      .then((result) => {
        BaseAPI.handleError(result, WORDS_API_ERRORS);
        return result.json();
      })
      .then((result) => getWordCb(result))
      .catch((error) => errorCb(error));
  }
}

export default new WordsAPI();
