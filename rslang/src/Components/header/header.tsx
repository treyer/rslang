import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <div className="App-header">
      <nav className="nav-bar">
        <Link to="/">
          {' '}
          <p>Главная</p>
        </Link>
        <nav>
          <Link to="/games">Мини-игры</Link>
        </nav>
        <nav>
          <Link to="/textbook">Учебник</Link>
        </nav>
        <nav>
          <Link to="/statistics">Статистика</Link>
        </nav>
      </nav>
    </div>
  );
};

export default Header;
