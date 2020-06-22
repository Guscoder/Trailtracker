import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logoutUser } from '../actions';
import { withRouter } from 'react-router-dom';
import '../styles/config-styles.scss';
import './header.scss';

class Header extends React.Component {
  handleLogout = () => {
    const { dispatch } = this.props;
    dispatch(logoutUser());
    this.props.history.push('/');
    console.log(this.props.isAuthenticated);
  };

  handleLogin = () => {
    this.props.history.push('/login');
  };

  LoginButton = () => {
    return (
      <button className='nav-link login-button' onClick={this.handleLogin}>
        Login
      </button>
    );
  };

  LogoutButton = () => {
    return (
      <button className='nav-link login-button' onClick={this.handleLogout}>
        Logout
      </button>
    );
  };

  loginStatus = (props) => {
    if (this.props.isAuthenticated) {
      return (
        <>
          <li className='nav-item active'>
            <button
              className='nav-link logout-button'
              onClick={this.handleLogout}
            >
              Logout
            </button>
            <span className='sr-only'>(current)</span>
          </li>

          <li className='nav-item active'>
            <Link className='nav-link' to='/optionspanel'>
              Admin
            </Link>
            <span className='sr-only'>(current)</span>
          </li>
        </>
      );
    } else {
      return (
        <li className='nav-item active'>
          <button className='nav-link logout-button' onClick={this.handleLogin}>
            Login
          </button>
          <span className='sr-only'>(current)</span>
        </li>
      );
    }
  };

  render() {
    const { isLoggingOut, logoutError, isAuthenticated } = this.props;

    return (
      <nav className='navbar d-flex'>
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
          <ul className='navbar-nav'>{this.loginStatus()}</ul>
        </div>
      </nav>
    );
  }
}

function mapStateToProps(state) {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    isVerifying: state.auth.isVerifying,
    isLoggingOut: state.auth.isLoggingOut,
    logoutError: state.auth.logoutError,
  };
}

export default connect(mapStateToProps)(withRouter(Header));
