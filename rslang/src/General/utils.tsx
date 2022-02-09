import { isEmail } from 'validator';

export const required = (value: string) => {
  if (!value.trim()) {
    return (
      <div className="alert alert-danger" role="alert">
        Поле обязательно для заполнения
      </div>
    );
  }
  return '';
};

export const validEmail = (value: string) => {
  if (!isEmail(value)) {
    return (
      <div className="alert alert-danger" role="alert">
        Email не валиден
      </div>
    );
  }
  return '';
};

export const validUsername = (value: string) => {
  if (value.length < 3 || value.length > 16) {
    return (
      <div className="alert alert-danger" role="alert">
        Имя пользователя должно содержать от 3 до 15 символов
      </div>
    );
  }
  return '';
};

export const validPassword = (value: string) => {
  if (value.length < 8 || value.length > 16) {
    return (
      <div className="alert alert-danger" role="alert">
        Пароль должен содержать от 8 до 15 символов
      </div>
    );
  }
  return '';
};
