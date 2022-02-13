import { useState, useRef, useContext } from 'react';
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
import CheckButton from 'react-validation/build/button';
import { CardContent, Avatar, Button, Typography } from '@mui/material';

import UsersAPI from '../../api/usersAPI';
import {
  clearUserLoginInLocalStorage,
  required,
  setUserLoginToLocalStorage,
  validEmail,
  validPassword,
} from '../../General/utils';
import { LoginContext } from '../../Context/login-context';

import './login.scss';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [message, setMessage] = useState('');
  const [submitBtnState, setSubmitBtnState] = useState(false);
  const form = useRef<HTMLFormElement>();
  const checkBtn = useRef<HTMLFormElement>();
  const { userLoginData, setUserLogin } = useContext(LoginContext);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail((e.target as HTMLInputElement).value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword((e.target as HTMLInputElement).value);
  };

  const handleRegister = (e: Event) => {
    e.preventDefault();
    setMessage('');
    setIsSuccess(false);
    if (form.current && checkBtn.current) {
      form.current.validateAll();
      if (checkBtn.current.context._errors.length === 0) {
        setSubmitBtnState(true);
        UsersAPI.loginUser({ email, password }, (errorMessage, data) => {
          if (errorMessage) {
            setMessage(errorMessage);
            setIsSuccess(false);
            setSubmitBtnState(false);
          } else {
            setMessage(`Пользователь вошёл`);
            setIsSuccess(true);
            if (data) {
              setUserLogin({
                isLogined: true,
                token: data.token,
                refreshToken: data.refreshToken,
                userId: data.userId,
                userName: data.name,
                isLoginOpen: true,
                isRegisterOpen: false,
              });
              setUserLoginToLocalStorage(
                data.token,
                data.refreshToken,
                data.userId,
                data.name,
              );
            }
          }
        });
      }
    }
  };

  const handleLogout = () => {
    setUserLogin({
      ...userLoginData,
      isLogined: false,
      token: '',
      refreshToken: '',
      userId: '',
    });
    setMessage('');
    setIsSuccess(false);
    setSubmitBtnState(false);
    clearUserLoginInLocalStorage();
  };

  return (
    <div className="login-form-wrapper">
      <div className="card card-container">
        {!userLoginData.isLogined && (
          <Avatar
            alt="Register user"
            src="./assets/img/user-login.png"
            sx={{ width: 90, height: 90 }}
            style={{ margin: '10px auto 0' }}
          />
        )}
        {userLoginData.isLogined && (
          <Avatar
            alt="Register user"
            src="./assets/img/user-added-logined.png"
            sx={{ width: 90, height: 90 }}
            style={{ margin: '10px auto 0' }}
          />
        )}
        <CardContent>
          {!userLoginData.isLogined && (
            <Form onSubmit={handleRegister} ref={form}>
              {!isSuccess && (
                <div>
                  <div className="form-group">
                    <label htmlFor="login-email">email</label>
                    <Input
                      id="login-email"
                      type="text"
                      className="form-control"
                      name="email"
                      value={email}
                      onChange={handleEmailChange}
                      validations={[required, validEmail]}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="login-password">пароль</label>
                    <Input
                      id="login-password"
                      type="password"
                      className="form-control"
                      name="password"
                      value={password}
                      onChange={handlePasswordChange}
                      validations={[required, validPassword]}
                    />
                  </div>
                  <div className="form-group">
                    <Button
                      type="submit"
                      variant="contained"
                      disabled={submitBtnState}
                    >
                      Войти
                    </Button>
                  </div>
                </div>
              )}
              {message && (
                <div className="form-group">
                  <div
                    className={
                      isSuccess ? 'alert alert-success' : 'alert alert-danger'
                    }
                    role="alert"
                  >
                    {message}
                  </div>
                </div>
              )}
              <CheckButton style={{ display: 'none' }} ref={checkBtn} />
            </Form>
          )}
          {userLoginData.isLogined && (
            <Typography>Вы вошли как {userLoginData.userName}</Typography>
          )}
          {userLoginData.isLogined && (
            <Button variant="contained" onClick={handleLogout}>
              Выход
            </Button>
          )}
        </CardContent>
      </div>
    </div>
  );
};

export default Login;
