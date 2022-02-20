import { isEmail } from 'validator';
import { Typography } from '@mui/material';
import { ExtraPoints } from './types';

export const required = (value: string) => {
  if (!value.trim()) {
    return (
      <Typography variant="body1" style={{ color: 'red' }}>
        Поле обязательно для заполнения
      </Typography>
    );
  }
  return '';
};

export const validEmail = (value: string) => {
  if (!isEmail(value)) {
    return (
      <Typography variant="body1" style={{ color: 'red' }}>
        Email не валиден
      </Typography>
    );
  }
  return '';
};

export const validUsername = (value: string) => {
  if (value.length < 3 || value.length > 16) {
    return (
      <Typography variant="body1" style={{ color: 'red' }}>
        Имя пользователя должно содержать от 3 до 15 символов
      </Typography>
    );
  }
  return '';
};

export const validPassword = (value: string) => {
  if (value.length < 8 || value.length > 16) {
    return (
      <Typography variant="body1" style={{ color: 'red' }}>
        Пароль должен содержать от 8 до 15 символов
      </Typography>
    );
  }
  return '';
};

export const setUserLoginToLocalStorage = (
  token: string,
  refreshToken: string,
  userId: string,
  userName: string | null,
) => {
  localStorage.setItem('token', token);
  localStorage.setItem('refreshToken', refreshToken);
  localStorage.setItem('userId', userId);
  localStorage.setItem('userName', String(userName));
};

export const clearUserLoginInLocalStorage = () => {
  localStorage.setItem('token', '');
  localStorage.setItem('refreshToken', '');
  localStorage.setItem('userId', '');
  localStorage.setItem('userName', '');
};

export const getExtraPointsString = (correctAnswersCount: number): string => {
  if (correctAnswersCount >= 4 && correctAnswersCount < 8) {
    return ExtraPoints.twentyPoints;
  }
  if (correctAnswersCount >= 8 && correctAnswersCount < 12) {
    return ExtraPoints.fortyPoints;
  }
  if (correctAnswersCount >= 12) {
    return ExtraPoints.eightyPoints;
  }
  return '';
};

export const getExtraPointsByString = (extraPoints: string): number => {
  switch (extraPoints) {
    case ExtraPoints.twentyPoints:
      return 20;

    case ExtraPoints.fortyPoints:
      return 40;

    case ExtraPoints.eightyPoints:
      return 80;

    default:
      return 0;
  }
};

export const getRandomInteger = (min: number, max: number): number => {
  const rand = min - 0.5 + Math.random() * (max - min + 1);
  return Math.round(rand);
};

// get count integer numbers from interval from min to max
export const getRandomIntegersFromInterval = (
  min: number,
  max: number,
  count: number,
): number[] => {
  const numbers: number[] = [];
  while (numbers.length !== count) {
    const rand = getRandomInteger(min, max);
    if (!numbers.includes(rand)) numbers.push(rand);
  }
  return numbers;
};
