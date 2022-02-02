import React from 'react';
import { Link } from 'react-router-dom';
import { Sections } from '../../General/constants';

const Header = () => {
  return (
    <div className="App-header">
      <nav className="nav-bar">
        {Sections.map((el) => (
          <nav>
            <Link className="" to={el.routePath}>
              <span className="Section-Title">{el.title}</span>
            </Link>
          </nav>
        ))}
      </nav>
    </div>
  );
};

export default Header;
