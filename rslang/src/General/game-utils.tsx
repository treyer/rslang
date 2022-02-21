import { TWord } from '../api/types';
import wordsAPI from '../api/wordsAPI';
import { PAGES_PER_GROUP, WORDS_PER_PAGE } from './constants';
import { getRandomIntegersFromInterval } from './utils';

export const getGameWords = async (
  page: number,
  group: number,
  count: number,
): Promise<TWord[]> => {
  const pagesNeed = Math.ceil(count / WORDS_PER_PAGE);
  let pagesNumbers: number[];

  if (page === -1) {
    pagesNumbers = getRandomIntegersFromInterval(
      0,
      PAGES_PER_GROUP - 1,
      pagesNeed,
    );
  } else {
    pagesNumbers = [];
    pagesNumbers.push(page - 1);
    if (pagesNeed !== 1) {
      let i = page - 2;
      while (pagesNumbers.length !== pagesNeed) {
        if (i === -1) break;
        pagesNumbers.push(i);
        i -= 1;
      }
    }
  }

  let result = await Promise.all(
    pagesNumbers.map((num) => {
      return new Promise((resolve) => {
        wordsAPI.getWords(num, group, (data) => {
          resolve(data);
        });
      });
    }),
  );
  result = result.flat();
  // shuffle array
  result = result
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
  if (result.length > count) {
    result = result.slice(0, count);
  }

  return result as TWord[];

  // TODO: catch error
};

const setPlayedWordStatus = (
  userId: string,
  wordId: string,
  token: string,
  answerType: boolean,
): void => {};
