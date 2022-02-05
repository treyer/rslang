import { BaseAPI } from './baseAPI';
import { TWord } from './types';

export class WordsAPI extends BaseAPI {
  getWords(
    page: number,
    group: number,
    updateWordsCb: (data: TWord[]) => void,
  ) {
    this.get(`words?page=${page}&group=${group}`)
      .then((result) => result.json())
      .then((data) => updateWordsCb(data));
  }

  getWord(wordId: string, getWordCb: (data: TWord) => void) {
    this.get(`words/${wordId}`)
      .then((result) => result.json())
      .then((result) => getWordCb(result));
  }
}

export default new WordsAPI();
