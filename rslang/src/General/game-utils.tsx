import { TWord } from '../api/types';
import wordsAPI from '../api/wordsAPI';
import { PAGES_PER_GROUP, WORDS_PER_PAGE } from './constants';
import { getRandomIntegersFromInterval, shuffleArray } from './utils';

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
    pagesNumbers = [0];
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
  // result = shuffleArray(result);
  if (result.length > count) {
    result = result.slice(0, count);
  }

  return result as TWord[];

  // TODO: catch error
};
