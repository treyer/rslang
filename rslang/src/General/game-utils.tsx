/* eslint-disable no-console */
import { TUserWord, TWord } from '../api/types';
import usersStatisticAPI from '../api/usersStatisticAPI';
import userWordsAPI from '../api/userWordsAPI';
import wordsAPI from '../api/wordsAPI';
import { PAGES_PER_GROUP, WORDS_PER_PAGE } from './constants';
import { GameType } from './types';
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
    if (failCounter !== undefined) {
      newFailCounter = failCounter + (answerType ? 0 : 1);
    } else {
      newFailCounter = 0;
    }
    if (successCounter !== undefined) {
      newSuccessCounter = successCounter + (answerType ? 1 : 0);
    } else {
      newSuccessCounter = 0;
    }
    if (correctAnswer !== undefined) {
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
          increaseCountOfLearnedWords(userId, token);
        } else {
          newDeleted = false;
        }
      }
      if (word.optional.isDifficult === false) {
        if (newCorrectAnswer === 3) {
          newDeleted = true;
          increaseCountOfLearnedWords(userId, token);
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

export const setGameStats = (
  userId: string,
  token: string,
  gameType: GameType,
  maxSeries: number,
  totalCorrectAnswers: number,
  totalWrongAnswers: number,
) => {
  console.log(
    userId,
    token,
    gameType,
    totalCorrectAnswers,
    totalWrongAnswers,
    maxSeries,
  );
  usersStatisticAPI.getStatistics(userId, token, (data) => {
    const newData = {
      optional: {
        bestSeries: 0,
        audioCall: {
          bestSeries: 0,
          rightAnswers: 0,
          wrongAnswers: 0,
        },
        sprint: {
          bestSeries: 0,
          rightAnswers: 0,
          wrongAnswers: 0,
        },
      },
    };
    if (data.optional) {
      if (data.optional.bestSeries !== undefined) {
        if (maxSeries > data.optional.bestSeries) {
          newData.optional.bestSeries = maxSeries;
        } else {
          newData.optional.bestSeries = data.optional.bestSeries;
        }
      }
      if (gameType === GameType.sprint) {
        if (data.optional.audioCall !== undefined) {
          if (data.optional.audioCall.bestSeries !== undefined) {
            newData.optional.audioCall.bestSeries =
              data.optional.audioCall.bestSeries;
          }
          if (data.optional.audioCall.rightAnswers !== undefined) {
            newData.optional.audioCall.rightAnswers =
              data.optional.audioCall.rightAnswers;
          }
          if (data.optional.audioCall.wrongAnswers !== undefined) {
            newData.optional.audioCall.wrongAnswers =
              data.optional.audioCall.wrongAnswers;
          }
        }

        if (data.optional.sprint) {
          if (data.optional.sprint.bestSeries !== undefined) {
            newData.optional.sprint.bestSeries =
              maxSeries > data.optional.sprint.bestSeries
                ? maxSeries
                : data.optional.sprint.bestSeries;
          }
          if (data.optional.sprint.rightAnswers !== undefined) {
            newData.optional.sprint.rightAnswers =
              totalCorrectAnswers + data.optional.sprint.rightAnswers;
          }
          if (data.optional.sprint.wrongAnswers !== undefined) {
            newData.optional.sprint.wrongAnswers =
              totalWrongAnswers + data.optional.sprint.wrongAnswers;
          }
        }
      }
      if (gameType === GameType.audio) {
        if (data.optional.sprint !== undefined) {
          if (data.optional.sprint.bestSeries !== undefined) {
            newData.optional.sprint.bestSeries =
              data.optional.sprint.bestSeries;
          }
          if (data.optional.sprint.rightAnswers !== undefined) {
            newData.optional.sprint.rightAnswers =
              data.optional.sprint.rightAnswers;
          }
          if (data.optional.sprint.wrongAnswers !== undefined) {
            newData.optional.sprint.wrongAnswers =
              data.optional.sprint.wrongAnswers;
          }
        }
        if (data.optional.audioCall !== undefined) {
          if (data.optional.audioCall.bestSeries !== undefined) {
            newData.optional.audioCall.bestSeries =
              maxSeries > data.optional.audioCall.bestSeries
                ? maxSeries
                : data.optional.audioCall.bestSeries;
          }
          if (data.optional.audioCall.rightAnswers !== undefined) {
            newData.optional.audioCall.rightAnswers =
              totalCorrectAnswers + data.optional.audioCall.rightAnswers;
          }
          if (data.optional.audioCall.wrongAnswers !== undefined) {
            newData.optional.audioCall.wrongAnswers =
              totalWrongAnswers + data.optional.audioCall.wrongAnswers;
          }
        }
      }
    } else {
      newData.optional.bestSeries = maxSeries;
      if (gameType === GameType.sprint) {
        newData.optional.sprint.bestSeries = maxSeries;
        newData.optional.sprint.rightAnswers = totalCorrectAnswers;
        newData.optional.sprint.wrongAnswers = totalWrongAnswers;
      }
      if (gameType === GameType.audio) {
        newData.optional.audioCall.bestSeries = maxSeries;
        newData.optional.audioCall.rightAnswers = totalCorrectAnswers;
        newData.optional.audioCall.wrongAnswers = totalWrongAnswers;
      }
    }
    const newDataStatistics = {
      learnedWords: 0,
      optional: newData.optional,
    };
    newDataStatistics.learnedWords = data.learnedWords;

    usersStatisticAPI.upsetStatistics(
      userId,
      token,
      newDataStatistics,
      () => {},
    );
  });
};

const increaseCountOfLearnedWords = (userId: string, token: string) => {
  usersStatisticAPI.getStatistics(userId, token, (data) => {
    if (data.learnedWords !== undefined) {
      const newData = { learnedWords: data.learnedWords + 1 };
      usersStatisticAPI.upsetStatistics(userId, token, newData, () => {});
    }
  });
};
