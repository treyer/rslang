import { useState, useRef, useContext } from 'react';
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
import CheckButton from 'react-validation/build/button';
import { CardContent, Avatar, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

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
  const navigate = useNavigate();

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
                pageForGames: -1,
              });
              setUserLoginToLocalStorage(
                data.token,
                data.refreshToken,
                data.userId,
                data.name,
              );
              navigate('/', { replace: true });
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
      pageForGames: -1,
    });
    setMessage('');
    setIsSuccess(false);
    setSubmitBtnState(false);
    clearUserLoginInLocalStorage();
    navigate('/', { replace: true });
  };

  return (
    <div className="login-form-wrapper">
      {!userLoginData.isLogined && (
        <Avatar
          sx={{ width: 90, height: 90 }}
          style={{ margin: '10px auto 0' }}
          src="/assets/img/user-login.png"
          alt="Register user"
        />
      )}
      {userLoginData.isLogined && (
        <Avatar
          sx={{ width: 90, height: 90 }}
          style={{ margin: '10px auto 0' }}
          src="/assets/img/user-added-logined.png"
          alt="Register user"
        />
      )}
      <CardContent>
        {!userLoginData.isLogined && (
          <Form onSubmit={handleRegister} ref={form}>
            {!isSuccess && (
              <div>
                <div className="form-group">
                  <Typography
                    variant="h6"
                    style={{
                      textAlign: 'left',
                      marginLeft: '5px',
                      marginBottom: '-10px',
                    }}
                  >
                    email:
                  </Typography>
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
                  <Typography
                    variant="h6"
                    style={{
                      textAlign: 'left',
                      marginLeft: '5px',
                      marginBottom: '-10px',
                    }}
                  >
                    пароль:
                  </Typography>
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
                    style={{ marginTop: '10px' }}
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
          <Typography style={{ marginBottom: '10px' }}>
            Вы вошли как {userLoginData.userName}
          </Typography>
        )}
        {userLoginData.isLogined && (
          <Button variant="contained" onClick={handleLogout}>
            Выход
          </Button>
        )}
      </CardContent>
    </div>
  );
};

export default Login;
