import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Card, Button } from '@mui/material';

import { Sections } from '../../General/constants';
import { LoginContext } from '../../Context/login-context';
import Register from '../register-form/register';
import Login from '../login-form/login';

const Header = () => {
  const { userLoginData, setUserLogin } = useContext(LoginContext);

  const handleLoginOnClick = () => {
    setUserLogin({
      ...userLoginData,
      isLoginOpen: !userLoginData.isLoginOpen,
      isRegisterOpen: false,
    });
  };

  const handleRegisterOnClick = () => {
    setUserLogin({
      ...userLoginData,
      isLoginOpen: false,
      isRegisterOpen: !userLoginData.isRegisterOpen,
    });
  };

  const handleCloseModals = () => {
    setUserLogin({
      ...userLoginData,
      isLoginOpen: false,
      isRegisterOpen: false,
    });
  };

  return (
    <div className="App-header">
      <nav className="nav-bar">
        {Sections.map((el) => (
          <nav key={el.id}>
            <Link className="" to={el.routePath}>
              <span className="Section-Title">{el.title}</span>
            </Link>
          </nav>
        ))}
      </nav>
      <div className="header-buttons">
        {!userLoginData.isLogined && (
          <Button
            variant="contained"
            onClick={handleRegisterOnClick}
            className="register-modal-btn"
          >
            Регистрация
          </Button>
        )}
        <div
          className={`register-wrapper ${
            userLoginData.isRegisterOpen && 'active'
          }`}
        >
          <Button
            variant="outlined"
            className="close-modal-register-btn"
            onClick={handleCloseModals}
          >
            x
          </Button>
          <Card className="card-register">
            <Register />
          </Card>
        </div>
        <Button variant="contained" onClick={handleLoginOnClick}>
          {userLoginData.isLogined ? 'Выход' : 'Вход'}
        </Button>
        <div
          className={`login-wrapper ${userLoginData.isLoginOpen && 'active'}`}
        >
          <Button
            variant="outlined"
            className="close-modal-login-btn"
            onClick={handleCloseModals}
          >
            x
          </Button>
          <Card className="card-login">
            <Login />
          </Card>
        </div>
        <div
          className={`modal-background ${
            (userLoginData.isLoginOpen || userLoginData.isRegisterOpen) &&
            'active'
          }`}
          onClick={handleCloseModals}
        />
      </div>
    </div>
  );
};

export default Header;
