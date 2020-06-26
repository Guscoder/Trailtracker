import React, { Component } from 'react';
import { auth, databaseRef } from '../../services/firebaseConfig';

import { withRouter } from 'react-router-dom';
import './adduser.scss';
const AddUser = () => (
  <main className='p-5'>
    <h1 className='text-center adduser-title'>Add New User</h1>
    <SignUpForm />
  </main>
);

const ROLES = {
  ADMIN: 'ADMIN',
  TRAIL_VOLUNTEER: 'TRAIL_VOLUNTEER',
};

const INITIAL_STATE = {
  username: '',
  email: '',
  passwordOne: '',
  passwordTwo: '',
  // isAdmin: '',
  // isVolunteer: '',
  error: null,
};

class SignUpFormBase extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }

  onSubmit = (event) => {
    const { username, email, passwordOne, isAdmin, isVolunteer } = this.state;
    let role = '';

    if (isAdmin) {
      role = ROLES.ADMIN;
    } else if (isVolunteer) {
      role = ROLES.TRAIL_VOLUNTEER;
    } else {
      alert('You did not choose a role');
    }

    auth
      .createUserWithEmailAndPassword(email, passwordOne)
      .then((authUser) => {
        console.log(authUser);
        databaseRef.child('users').child(authUser.user.uid).set({
          username,
          email,
          role,
        });
      })
      .then((authUser) => {
        this.setState({ ...INITIAL_STATE });
        this.props.history.push('/optionspanel');
      })
      .catch((error) => {
        this.setState({ error });
      });

    event.preventDefault();
  };
  onChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  onChangeCheckbox = (event) => {
    this.setState({ [event.target.name]: event.target.checked });
  };

  render() {
    const {
      username,
      email,
      passwordOne,
      passwordTwo,
      isAdmin,
      isVolunteer,
      error,
    } = this.state;
    const isInvalid =
      passwordOne !== passwordTwo ||
      passwordOne === '' ||
      email === '' ||
      username === '' ||
      (isAdmin && isVolunteer) ||
      (!isAdmin && !isVolunteer);

    return (
      <form onSubmit={this.onSubmit}>
        <div className='form-group row'>
          <label
            htmlFor='username'
            className='col-md-3 text-md-right col-form-label'
          >
            Full Name
          </label>
          <div className='col-md-6'>
            <input
              name='username'
              value={username}
              onChange={this.onChange}
              type='text'
              placeholder='Full Name'
              className='form-control'
            />
          </div>
        </div>
        <div className='form-group row'>
          <label
            htmlFor='email'
            className='col-md-3 col-form-label text-md-right'
          >
            Email Address
          </label>
          <div className='col-md-6'>
            <input
              name='email'
              value={email}
              onChange={this.onChange}
              type='text'
              placeholder='Email Address'
              className='form-control'
            />
          </div>
        </div>
        <div className='form-group row'>
          <label
            htmlFor='passwordOne'
            className='text-md-right col-md-3 col-form-label'
          >
            Password
          </label>
          <div className='col-md-6'>
            <input
              name='passwordOne'
              value={passwordOne}
              onChange={this.onChange}
              type='password'
              placeholder='Password'
              className='form-control'
            />
          </div>
        </div>

        <div className='form-group row'>
          <label
            htmlFor='passwordTwo'
            className='text-md-right col-md-3 col-form-label'
          >
            Full Name
          </label>
          <div className='col-md-6'>
            <input
              name='passwordTwo'
              value={passwordTwo}
              onChange={this.onChange}
              type='password'
              placeholder='Confirm Password'
              className='form-control'
            />
          </div>
        </div>

        <div class='form-group row'>
          <div className='col-md-3 text-md-right'>User Role</div>
          <div className='col-md-6 form-check'>
            <div className='d-xs-block pl-3'>
              <input
                name='isAdmin'
                type='checkbox'
                class='form-check-input'
                id='administrator'
                // checked={isAdmin}
                onChange={this.onChangeCheckbox}
              />
              <label class='form-check-label' htmlFor='administrator'>
                Administrator
              </label>
            </div>
            <div className='d-xs-block pl-3'>
              <input
                name='isVolunteer'
                type='checkbox'
                class='form-check-input pl-5'
                id='volunteer'
                // checked={isVolunteer}
                onChange={this.onChangeCheckbox}
              />
              <label class='form-check-label' htmlFor='volunteer'>
                Trail Volunteer
              </label>
            </div>
          </div>
        </div>
        <div className='text-sm-right col-md-3'>
          <button disabled={isInvalid} type='submit'>
            Sign Up
          </button>
        </div>

        {error && <p>{error.message}</p>}
      </form>
    );
  }
}

const SignUpForm = withRouter(SignUpFormBase);

export default AddUser;

export { SignUpForm };
