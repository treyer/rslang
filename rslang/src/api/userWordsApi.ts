import { TUserWord } from './types';

export class UserWordsApi {
  url: string;

  constructor(url: string) {
    this.url = url;
  }

  getUserWords(userId: string, getUserWordsCb: (data: TUserWord[]) => void) {
    const promise = fetch(`${this.url}/users/${userId}/words`);
    promise
      .then((result) => result.json())
      .then((result) => getUserWordsCb(result));
  }
}

export default new UserWordsApi(
  'https://react-learn-words-together.herokuapp.com',
);
