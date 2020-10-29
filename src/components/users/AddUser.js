import React, { Component } from 'react';
import * as firebase from 'firebase';
import { connect } from 'react-redux';
import { addUser } from '../../actions';
import { databaseRef } from '../../services/firebaseConfig';
import { withRouter } from 'react-router-dom';
import './adduser.scss';

const fireConfig = {
  apiKey: 'AIzaSyAWfYB2aX2JVmlJkD8iFm0SLGFFNuxtKio',
  authDomain: 'trailtracker-1060b.firebaseapp.com',
  databaseURL: 'https://trailtracker-1060b.firebaseio.com',
};

const secondaryApp = firebase.initializeApp(fireConfig, 'SecondaryApp');

const AddUser = () => (
  <main className='p-5'>
    <h1 className='text-center adduser-title'>Add New User</h1>
    <SignUpForm />
  </main>
);

const ROLES = {
  ADMIN: 'ADMIN',
  MAINTAINER: 'MAINTAINER',
  SAWYER: 'SAWYER',
};

const INITIAL_STATE = {
  username: '',
  phone: '',
  email: '',
  passwordOne: '',
  passwordTwo: '',
  isAdmin: '',
  isMaintainer: '',
  isSawyer: '',
  error: null,
};

class SignUpFormBase extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }

  onSubmit = (event) => {
    const {
      username,
      phone,
      email,
      passwordOne,
      isAdmin,
      isMaintainer,
      isSawyer,
    } = this.state;

    let role = '';

    if (isAdmin) {
      role = ROLES.ADMIN;
    } else if (isMaintainer) {
      role = ROLES.MAINTAINER;
    } else if (isSawyer) {
      role = ROLES.SAWYER;
    } else {
      alert('You did not choose a role');
    }

    secondaryApp
      .auth()
      .createUserWithEmailAndPassword(email, passwordOne)
      .then((authUser) => {
        console.log(authUser);
        console.log(role);
        databaseRef.child('users').child(authUser.user.uid).set({
          username,
          phone,
          email,
          role,
        });
        addUser();

        secondaryApp.auth().signOut();
      })
      .then(() => {
        this.setState({ ...INITIAL_STATE });
        console.log('Adding user and props: ' + this.props);
        this.props.history.push('/users/userlist');
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
    console.log(this.state);
  };

  render() {
    const {
      username,
      phone,
      email,
      passwordOne,
      passwordTwo,
      isAdmin,
      isMaintainer,
      isSawyer,
      error,
    } = this.state;

    const isInvalid =
      passwordOne !== passwordTwo ||
      passwordOne === '' ||
      email === '' ||
      username === '' ||
      String(phone).length > 10 ||
      (isAdmin && isMaintainer && isSawyer) ||
      (!isAdmin && !isMaintainer && !isSawyer) ||
      (isAdmin && isMaintainer) ||
      (isAdmin && isSawyer) ||
      (isMaintainer && isSawyer);
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
            htmlFor='phone'
            className='col-md-3 col-form-label text-md-right'
          >
            Phone
          </label>
          <div className='col-md-6'>
            <input
              name='phone'
              value={phone}
              onChange={this.onChange}
              type='tel'
              placeholder='Phone Number (optional)'
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
            Confirm Password
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
                className='form-check-input'
                id='administrator'
                // checked={isAdmin}
                onChange={this.onChangeCheckbox}
              />
              <label className='form-check-label' htmlFor='administrator'>
                Administrator
              </label>
            </div>
            <div className='d-xs-block pl-3'>
              <input
                name='isSawyer'
                type='checkbox'
                className='form-check-input pl-5'
                id='sawyer'
                // checked={isSawyer}
                onChange={this.onChangeCheckbox}
              />
              <label className='form-check-label' htmlFor='sawyer'>
                Sawyer
              </label>
            </div>
            <div className='d-xs-block pl-3'>
              <input
                name='isMaintainer'
                type='checkbox'
                className='form-check-input pl-5'
                id='maintainer'
                // checked={isMaintainer}
                onChange={this.onChangeCheckbox}
              />
              <label className='form-check-label' htmlFor='maintainer'>
                Trail Maintainer
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

const mapDispatchToProps = {
  addUser,
};

const SignUpForm = connect(
  null,
  mapDispatchToProps
)(withRouter(SignUpFormBase));

export default AddUser;

export { SignUpForm };
