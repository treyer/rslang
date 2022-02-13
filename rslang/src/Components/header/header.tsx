import { useContext } from 'react';

import { Link } from 'react-router-dom';
import { Sections } from '../../General/constants';
import { LoginContext } from '../../Context/login-context';
import { clearUserLoginInLocalStorage } from '../../General/utils';
import Register from '../register-form/register';
import Login from '../login-form/login';

const Header = () => {
  const { userLoginData, setUserLogin } = useContext(LoginContext);

  const handleOnClick = () => {
    if (userLoginData.isLogined) {
      setUserLogin({
        isLogined: false,
        token: '',
        refreshToken: '',
        userId: '',
        isLoginOpen: false,
        isRegisterOpen: false,
      });
      clearUserLoginInLocalStorage();
    } else {
      // TODO: open register - login pannel
    }
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
      <button type="button" onClick={handleOnClick}>
        {userLoginData.isLogined ? 'Выход' : 'Вход'}
      </button>
      <div className="login-wrapper">
        <Login />
      </div>
      <button type="button">Регистрация</button>
      <div className="register-wrapper">
        <Register />
      </div>
    </div>
  );
};

export default Header;
