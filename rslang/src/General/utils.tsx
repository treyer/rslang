import { isEmail } from 'validator';
import { Typography } from '@mui/material';

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
