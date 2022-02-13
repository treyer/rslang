import { useContext } from 'react';

import { Link } from 'react-router-dom';
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

  const handleBackgroundOnClick = () => {
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
          <button type="button" onClick={handleRegisterOnClick}>
            Регистрация
          </button>
        )}
        <div
          className={`register-wrapper ${
            userLoginData.isRegisterOpen && 'active'
          }`}
        >
          <Register />
        </div>
        <button type="button" onClick={handleLoginOnClick}>
          {userLoginData.isLogined ? 'Выход' : 'Вход'}
        </button>
        <div
          className={`login-wrapper ${userLoginData.isLoginOpen && 'active'}`}
        >
          <Login />
        </div>
        <div
          className={`modal-background ${
            (userLoginData.isLoginOpen || userLoginData.isRegisterOpen) &&
            'active'
          }`}
          onClick={handleBackgroundOnClick}
        />
      </div>
    </div>
  );
};

export default Header;
