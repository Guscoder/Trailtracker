import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { loginUser } from '../actions';

class Login extends Component {
  state = { email: '', password: '', isAuthenticated: '' };

  handleEmailChange = ({ target }) => {
    this.setState({ email: target.value });
  };

  handlePasswordChange = ({ target }) => {
    this.setState({ password: target.value });
  };

  handleSubmit = () => {
    console.log('submitting user info');
    const { dispatch } = this.props;
    const { email, password } = this.state;
    dispatch(loginUser(email, password));
    this.props.history.push('/optionspanel');
  };

  render() {
    const { loginError, isAuthenticated } = this.props;
    if (isAuthenticated) {
      return <Redirect to='/optionspanel' />;
    } else {
      return (
        <div className='container-fluid'>
          <form>
            <div className='form-group row'>
              <label
                htmlFor='inputUserName'
                className='col-sm-2 col-form-label'
              >
                Email Address
              </label>
              <div className='col-sm-10'>
                <input
                  type='email'
                  className='form-control'
                  placeholder='Email'
                  id='email'
                  name='email'
                  onChange={this.handleEmailChange}
                ></input>
              </div>
            </div>
            <div className='form-group row'>
              <label
                htmlFor='inputPassword'
                className='col-sm-2 col-form-label'
              >
                Password
              </label>
              <div className='col-sm-10'>
                <input
                  type='text'
                  className='form-control'
                  name='password'
                  id='password'
                  onChange={this.handlePasswordChange}
                  placeholder='Password'
                ></input>
              </div>
            </div>
            {loginError && <p>Incorrect email or password.</p>}
            <div className='form-group row'>
              <div className='col-sm-10 offset-sm-2'>
                <button
                  type='submit'
                  className='btn btn-primary'
                  onClick={this.handleSubmit}
                >
                  Sign in
                </button>
              </div>
            </div>
          </form>
        </div>
      );
    }
  }
}

function mapStateToProps(state) {
  return {
    isLoggingIn: state.auth.isLoggingIn,
    loginError: state.auth.loginError,
    isAuthenticated: state.auth.isAuthenticated,
  };
}

export default connect(mapStateToProps)(Login);
