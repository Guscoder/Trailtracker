import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import OptionsButton from './buttons/OptionsButton';
import '../styles/config-styles.scss';
import './adminmenu.scss';

class AdminMenu extends Component {
  handleClick = (e) => {
    if (e.target.classList.contains('dropdown-toggle')) {
      console.log('my target');
      // if clicked inside menu do something
    } else {
      // If clicked outside menu, close the navbar.
      this.node.classList.remove('show');
    }
  };

  componentDidMount() {
    document.addEventListener('click', this.handleClick, false);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleClick, false);
  }

  render() {
    return (
      <nav className='navbar admin-menu navbar-expand-md navbar-dark'>
        <button
          className='navbar-toggler'
          type='button'
          data-toggle='collapse'
          data-target='#navbarNavDropdown'
          aria-controls='navbarNavDropdown'
          aria-expanded='false'
          aria-label='Toggle navigation'
        >
          <span className='navbar-toggler-icon'></span>
        </button>

        <div
          className='collapse navbar-collapse menu-links'
          id='navbarNavDropdown'
          ref={(node) => (this.node = node)}
        >
          <ul className='navbar-nav'>
            <li className='nav-item active'>
              <Link to='/trailinputform' className='nav-link'>
                <OptionsButton buttonText={'Add New Item'} />
                <span className='sr-only'>(current)</span>
              </Link>
            </li>

            <li className='nav-item dropdown'>
              <a
                className='nav-link dropdown-toggle'
                href='#'
                id='navbarDropdownMenuLink'
                role='button'
                data-toggle='dropdown'
                aria-haspopup='true'
                aria-expanded='false'
              >
                View Trail Items
              </a>
              <div
                className='dropdown-menu'
                aria-labelledby='navbarDropdownMenuLink'
              >
                <Link to='/tablelist/activeitems' className='dropdown-item'>
                  <OptionsButton buttonText={'Active Items'} />
                </Link>
                <Link to='/tablelist/completeditems' className='dropdown-item'>
                  <OptionsButton buttonText={'Completed Items'} />
                </Link>
                <Link to='/tablelist/submitteditems' className='dropdown-item'>
                  <OptionsButton buttonText={'New Submissions'} />
                </Link>
              </div>
            </li>
            <li className='nav-item dropdown'>
              <a
                className='nav-link dropdown-toggle'
                href='#'
                id='navbarDropdownMenuLink'
                role='button'
                data-toggle='dropdown'
                aria-haspopup='true'
                aria-expanded='false'
              >
                Manage Users
              </a>
              <div
                className='dropdown-menu'
                aria-labelledby='navbarDropdownMenuLink'
              >
                <Link to='/users/adduser' className='dropdown-item'>
                  <OptionsButton buttonText={'Add User'} />
                </Link>
                <Link to='/users/userlist' className='dropdown-item'>
                  <OptionsButton buttonText={'Edit/Delete User'} />
                </Link>
              </div>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

export default AdminMenu;
