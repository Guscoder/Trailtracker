import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/config-styles.scss';
import './header.scss';

class Header extends React.Component {
  render() {
    return (
      <nav class='navbar d-flex'>
        <a
          className='navbar-brand'
          target='_blank '
          href='https://northcountrytrail.org/'
        >
          <img
            src={require('../assets/images/nctLogo.jpeg')}
            alt='north country trail logo'
            className='nct-logo'
          />
        </a>
        <h1 className='title-header'>
          <Link to='/'>Trail Tracker</Link>
        </h1>

        <div className='nav-links justify-content-end'>
          <ul className='navbar-nav'>
            <li className='nav-item active'>
              <Link className='nav-link' to='/login'>
                Login
              </Link>
              <span className='sr-only'>(current)</span>
            </li>
            <li className='nav-item active'>
              <Link className='nav-link' to='/optionspanel'>
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
