import { StatusCodes } from 'http-status-codes';

import { TAPIErrorsMap } from './types';

export const USERS_API_ERRORS: TAPIErrorsMap = {
  [StatusCodes.UNPROCESSABLE_ENTITY]: 'Incorrect e-mail or password.',
  [StatusCodes.UNAUTHORIZED]: 'Access token is missing or invalid.',
  [StatusCodes.NOT_FOUND]: 'User not found.',
  [StatusCodes.BAD_REQUEST]: 'Bad request.',
  [StatusCodes.FORBIDDEN]: 'Access token is missing, expired or invalid.',
  [StatusCodes.EXPECTATION_FAILED]: 'This user is already existed.',
};

export const USER_WORDS_API_ERRORS: TAPIErrorsMap = {
  [StatusCodes.UNAUTHORIZED]: 'Unauthorized.',
  [StatusCodes.PAYMENT_REQUIRED]: 'Access token is missing or invalid.',
  [StatusCodes.BAD_REQUEST]: 'Bad request.',
  [StatusCodes.NOT_FOUND]: "User's word not found.",
};
