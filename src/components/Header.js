import React from 'react';
import { Link } from 'react-router-dom';

const navHeader = {
  backgroundColor: '#444444',
  color: '#f7f0de',
  position: '-webkit-sticky',
  position: 'sticky',
  top: 0,
  zIndex: 999,
};

const linkColor = { textDecoration: 'none', color: '#f7f0de' };

class Header extends React.Component {
  render() {
    return (
      <nav className='navbar' style={navHeader}>
        <a
          style={linkColor}
          className='navbar-brand'
          target='_blank '
          href='https://northcountrytrail.org/'
        >
          NCT
        </a>
        <h1 className='text-center text-warning'>
          <Link to='/' style={navHeader}>
            Trail Maintenance Log
          </Link>
        </h1>

        <div className='justify-content-end'>
          <ul className='navbar-nav'>
            <li className='nav-item active'>
              <Link className='nav-link' to='/login' style={navHeader}>
                Login
              </Link>
              <span className='sr-only'>(current)</span>
            </li>
            <li className='nav-item active'>
              <Link className='nav-link' to='/optionspanel' style={navHeader}>
                Admin
              </Link>
              <span className='sr-only'>(current)</span>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

export default Header;
