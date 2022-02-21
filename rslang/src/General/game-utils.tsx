import { TUserWord, TWord } from '../api/types';
import userWordsAPI from '../api/userWordsAPI';
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

export const setPlayedWordStatus = (
  userId: string,
  wordId: string,
  token: string,
  answerType: boolean,
): void => {
  userWordsAPI.getUserWord(userId, wordId, token, (error, word) => {
    if (error) {
      if (error === 'User`s word not found.')
        addWordAsNewToUser(userId, wordId, token, answerType);
    } else if (word) updateWordForUser(userId, wordId, token, answerType, word);
  });
};

const addWordAsNewToUser = (
  userId: string,
  wordId: string,
  token: string,
  answerType: boolean,
) => {
  userWordsAPI.createUserWord(
    userId,
    wordId,
    token,
    {
      difficulty: 'difficult',
      optional: {
        isDifficult: false,
        deleted: false,
        failCounter: answerType ? 0 : 1,
        successCounter: answerType ? 1 : 0,
        correctAnswer: answerType ? 1 : 0,
      },
    },
    () => {},
  );
};

const updateWordForUser = (
  userId: string,
  wordId: string,
  token: string,
  answerType: boolean,
  word: TUserWord,
) => {
  if (word.optional) {
    const { failCounter, successCounter, correctAnswer } = word.optional;
    let newFailCounter: number;
    let newSuccessCounter: number;
    let newCorrectAnswer: number;
    if (failCounter) {
      newFailCounter = failCounter + (answerType ? 0 : 1);
    } else {
      newFailCounter = 0;
    }
    if (successCounter) {
      newSuccessCounter = successCounter + (answerType ? 1 : 0);
    } else {
      newSuccessCounter = 0;
    }
    if (correctAnswer) {
      if (answerType) {
        newCorrectAnswer = correctAnswer + 1;
      } else {
        newCorrectAnswer = 0;
      }
    } else {
      newCorrectAnswer = 0;
    }
    let newDeleted = false;
    if (word.optional.deleted === true) {
      newDeleted = true;
    } else {
      if (word.optional.isDifficult === true) {
        if (newCorrectAnswer === 5) {
          newDeleted = true;
        } else {
          newDeleted = false;
        }
      }
      if (word.optional.isDifficult === false) {
        if (newCorrectAnswer === 3) {
          newDeleted = true;
        } else {
          newDeleted = false;
        }
      }
    }
    userWordsAPI.updateUserWord(
      userId,
      token,
      wordId,
      {
        difficulty: 'difficult',
        optional: {
          isDifficult: word.optional.isDifficult,
          deleted: newDeleted,
          failCounter: newFailCounter,
          successCounter: newSuccessCounter,
          correctAnswer: newCorrectAnswer,
        },
      },
      () => {},
    );
  }
};
