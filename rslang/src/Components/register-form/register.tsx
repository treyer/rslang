import { useState, useRef } from 'react';
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
import CheckButton from 'react-validation/build/button';

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
  };

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

  return (
    <div className="register-form-wrapper">
      <div className="card card-container">
        <Form onSubmit={handleRegister} ref={form}>
          {!isSuccess && (
            <div>
              <div className="form-group">
                <label htmlFor="username">имя</label>
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
                <label htmlFor="email">email</label>
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
                <label htmlFor="password">пароль</label>
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
              <div className="form-group">
                <button
                  type="submit"
                  className="btn btn-primary btn-block"
                  disabled={submitBtnState}
                >
                  Зарегистрироваться
                </button>
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
      </div>
    </div>
  );
};

export default Register;