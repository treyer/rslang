import { useContext } from 'react';

import { Link } from 'react-router-dom';
import { Sections } from '../../General/constants';
import { LoginContext } from '../../Context/login-context';
import { clearUserLoginInLocalStorage } from '../../General/utils';

const Header = () => {
  const { userLoginData, setUserLogin } = useContext(LoginContext);

  const handleOnClick = () => {
    if (userLoginData.isLogined) {
      setUserLogin({
        isLogined: false,
        token: '',
        refreshToken: '',
        userId: '',
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
      <div onClick={handleOnClick}>
        {userLoginData.isLogined ? 'Выход' : 'Вход'}
      </div>
    </div>
  );
};

export default Header;
