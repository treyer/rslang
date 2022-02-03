import { TWord } from './types';

export class WordsApi {
  url: string;

  constructor(url: string) {
    this.url = url;
  }

  getWords(
    page: number,
    group: number,
    updateWordsCb: (data: TWord[]) => void,
  ) {
    const promise = fetch(`${this.url}/words?page=${page}&group=${group}`);
    promise.then((result) => result.json()).then((data) => updateWordsCb(data));
  }

  getWord(wordId: string, getWordCb: (data: TWord) => void) {
    const promise = fetch(`${this.url}/words/${wordId}`);
    promise.then((result) => result.json()).then((result) => getWordCb(result));
  }
}

export default new WordsApi('https://react-learn-words-together.herokuapp.com');
