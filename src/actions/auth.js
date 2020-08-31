import { auth, databaseRef } from '../services/firebaseConfig';

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_FAILURE = 'LOGOUT_FAILURE';
export const VERIFY_REQUEST = 'VERIFY_REQUEST';
export const VERIFY_SUCCESS = 'VERIFY_SUCCESS';
export const CURRENT_USER_ROLE = 'CURRENT_USER_ROLE';

const requestLogin = () => {
  return {
    type: LOGIN_REQUEST,
  };
};

const receiveLogin = (user) => {
  console.log('yaaaay logged in');
  return {
    type: LOGIN_SUCCESS,
    user,
  };
};

// const loginError = () => {
//   return {
//     type: LOGIN_FAILURE,
//   };
// };

const requestLogout = () => {
  return {
    type: LOGOUT_REQUEST,
  };
};

const receiveLogout = () => {
  console.log('received logout');
  return {
    type: LOGOUT_SUCCESS,
  };
};

const logoutError = () => {
  return {
    type: LOGOUT_FAILURE,
  };
};

const verifyRequest = () => {
  return {
    type: VERIFY_REQUEST,
  };
};

const verifySuccess = () => {
  return {
    type: VERIFY_SUCCESS,
  };
};

export const setCurrentUserRole = (role) => {
  return {
    type: CURRENT_USER_ROLE,
    role,
  };
};

const getUserRole = (user) => (dispatch) => {
  auth.onAuthStateChanged(function (user) {
    let myUserId = auth.currentUser.uid;
    databaseRef
      .child('users')
      .orderByKey()
      .equalTo(myUserId)
      .on('value', function (snapshot) {
        if (snapshot.val()) {
          let userData = snapshot.val()[myUserId];
          let userRole = userData['role'];
          dispatch(setCurrentUserRole(userRole));
        } else {
          alert('Error finding user in database!');
        }
      });
  });
};

export const loginUser = (email, password) => (dispatch) => {
  dispatch(requestLogin());

  auth
    .signInWithEmailAndPassword(email, password)
    .then(function (user) {
      auth.onAuthStateChanged(function (user) {
        let myUserId = auth.currentUser.uid;
        databaseRef
          .child('users')
          .orderByKey()
          .equalTo(myUserId)
          .on('value', function (snapshot) {
            if (snapshot.val()) {
              let userData = snapshot.val()[myUserId];
              let userRole = userData['role'];
              dispatch(setCurrentUserRole(userRole));
            } else {
              alert('Error finding user in database!');
            }
          });
      });
      dispatch(receiveLogin(user));
    })
    .catch(function (error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      if (errorCode === 'auth/wrong-password') {
        alert('Wrong password.');
      } else {
        alert(errorMessage);
      }
    });
};

export const logoutUser = () => (dispatch) => {
  dispatch(requestLogout());
  auth
    .signOut()
    .then(function () {
      dispatch(receiveLogout());
    })
    .catch((error) => {
      //Do something with the error if you want!
      dispatch(logoutError());
    });
};

export const verifyAuth = () => (dispatch) => {
  console.log('running verify');
  dispatch(verifyRequest());
  auth.onAuthStateChanged((user) => {
    if (user !== null) {
      dispatch(receiveLogin(user));
      getUserRole(user);
      // let myUserId = auth.currentUser.uid;
      // databaseRef
      //   .child('users')
      //   .orderByKey()
      //   .equalTo(myUserId)
      //   .on('value', function (snapshot) {
      //     if (snapshot.val()) {
      //       let userData = snapshot.val()[myUserId];
      //       let userRole = userData['role'];
      //       console.log(userData);
      //       console.log(userRole);
      //       dispatch(setCurrentUserRole(userRole));
      //     } else {
      //       alert('Error finding user in database!');
      //     }
      //   });
      console.log('user not null');
    }
    console.log('verifying success');

    dispatch(verifySuccess());
  });
};
