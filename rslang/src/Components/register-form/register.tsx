import { useState, useRef } from 'react';
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
import CheckButton from 'react-validation/build/button';
import { CardContent, Avatar, Button, Typography } from '@mui/material';

import UsersAPI from '../../api/usersAPI';
import {
  required,
  validEmail,
  validUsername,
  validPassword,
} from '../../General/utils';

import './register.scss';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [message, setMessage] = useState('');
  const [submitBtnState, setSubmitBtnState] = useState(false);
  const form = useRef<HTMLFormElement>();
  const checkBtn = useRef<HTMLFormElement>();

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername((e.target as HTMLInputElement).value);
    setMessage('');
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail((e.target as HTMLInputElement).value);
    setMessage('');
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword((e.target as HTMLInputElement).value);
    setMessage('');
  };

  const handleRegister = (e: Event) => {
    e.preventDefault();
    setMessage('');
    setIsSuccess(false);
    if (form.current && checkBtn.current) {
      form.current.validateAll();
      if (checkBtn.current.context._errors.length === 0) {
        setSubmitBtnState(true);
        UsersAPI.createUser(
          { name: username, email, password },
          (errorMessage, data) => {
            if (errorMessage) {
              setMessage(errorMessage);
              setIsSuccess(false);
              setSubmitBtnState(false);
            } else {
              setMessage(`Пользователь ${data?.name} зарегистрирован`);
              setIsSuccess(true);
            }
          },
        );
      }
    }
  };

  const handleFormReset = () => {
    setUsername('');
    setEmail('');
    setPassword('');
    setIsSuccess(false);
    setMessage('');
    setSubmitBtnState(false);
  };

  return (
    <div className="register-form-wrapper">
      <div className="card card-container">
        {!isSuccess && (
          <Avatar
            sx={{ width: 90, height: 90 }}
            style={{ margin: '10px auto 0' }}
            src="/assets/img/user-add.png"
            alt="Register user"
          />
        )}
        {isSuccess && (
          <Avatar
            sx={{ width: 90, height: 90 }}
            style={{ margin: '10px auto 0' }}
            src="/assets/img/user-added-logined.png"
            alt="User registered"
          />
        )}
        <CardContent>
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
                    имя:
                  </Typography>
                  <Input
                    id="username"
                    type="text"
                    className="form-control"
                    name="username"
                    value={username}
                    onChange={handleUsernameChange}
                    validations={[required, validUsername]}
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
                    email:
                  </Typography>
                  <Input
                    id="email"
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
                    id="password"
                    type="password"
                    className="form-control"
                    name="password"
                    value={password}
                    onChange={handlePasswordChange}
                    validations={[required, validPassword]}
                  />
                </div>
                <Button
                  type="submit"
                  variant="contained"
                  disabled={submitBtnState}
                  style={{ marginTop: '10px' }}
                >
                  Зарегистрироваться
                </Button>
              </div>
            )}
            {message && (
              <div className="form-group">
                {isSuccess && (
                  <Typography variant="body1" style={{ color: 'green' }}>
                    {message}
                  </Typography>
                )}
                {isSuccess && (
                  <Button variant="contained" onClick={handleFormReset}>
                    Зарегистрировать заново
                  </Button>
                )}
                {!isSuccess && (
                  <Typography variant="body1" style={{ color: 'red' }}>
                    {message}
                  </Typography>
                )}
              </div>
            )}
            <CheckButton style={{ display: 'none' }} ref={checkBtn} />
          </Form>
        </CardContent>
      </div>
    </div>
  );
};

export default Register;
