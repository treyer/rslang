import { StatusCodes } from 'http-status-codes';

import { TAPIErrorsMap } from './types';

export const USERS_API_ERRORS: TAPIErrorsMap = {
  [StatusCodes.UNPROCESSABLE_ENTITY]: 'Incorrect e-mail or password.',
  [StatusCodes.UNAUTHORIZED]: 'Access token is missing or invalid.',
  [StatusCodes.NOT_FOUND]: 'User not found.',
  [StatusCodes.BAD_REQUEST]: 'Bad request.',
  [StatusCodes.FORBIDDEN]: 'Incorrect e-mail or password',
  [StatusCodes.EXPECTATION_FAILED]:
    'Пользователь с указанным email уже существует.',
  [StatusCodes.INTERNAL_SERVER_ERROR]: 'Internal Server Error.',
};

export const USER_WORDS_API_ERRORS: TAPIErrorsMap = {
  [StatusCodes.UNAUTHORIZED]: 'Unauthorized.',
  [StatusCodes.PAYMENT_REQUIRED]: 'Access token is missing or invalid.',
  [StatusCodes.BAD_REQUEST]: 'Bad request.',
  [StatusCodes.NOT_FOUND]: 'User`s word not found.',
  [StatusCodes.EXPECTATION_FAILED]: 'This user`s word already exists.',
  [StatusCodes.INTERNAL_SERVER_ERROR]: 'Internal Server Error.',
};

export const WORDS_API_ERRORS: TAPIErrorsMap = {
  [StatusCodes.INTERNAL_SERVER_ERROR]: 'Internal Server Error.',
  [StatusCodes.NOT_FOUND]: 'Word not found.',
};

export const USER_AGGREGATED_WORDS_API_ERRORS: TAPIErrorsMap = {
  [StatusCodes.INTERNAL_SERVER_ERROR]: 'Internal Server Error.',
  [StatusCodes.NOT_FOUND]: 'Word not found.',
  [StatusCodes.UNAUTHORIZED]: 'Unauthorized.',
};

export const USERS_STATISTIC_API_ERRORS: TAPIErrorsMap = {
  [StatusCodes.UNAUTHORIZED]: 'Unauthorized.',
  [StatusCodes.INTERNAL_SERVER_ERROR]: 'Internal Server Error.',
  [StatusCodes.NOT_FOUND]: 'Statistics not found.',
};
