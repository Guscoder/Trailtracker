import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import {
  FETCH_TRAILITEMS,
  FETCH_USERS,
  DELETE_USER,
  ADD_USER,
} from '../actions';
import { VIEW_TRAIL_ITEM } from '../actions';
import { DELETE_TRAIL_ITEM } from '../actions';
import { UPDATE_TRAIL_ITEM } from '../actions';

import auth from './auth';

const snapshotToArray = (snapshot) => {
  let returnArr = [];

  snapshot.forEach(function (childSnapshot) {
    let item = childSnapshot.val();
    item.key = childSnapshot.key;

    returnArr.push(item);
  });

  return returnArr;
};

const trailworkReducer = (state = {}, action) => {
  switch (action.type) {
    case 'ADD_TRAIL_ITEM':
      console.log('created item');
      return { ...state, trailItems: { ...state.trailItems } };
    case 'ADD_TRAILITEM_ERROR':
      console.log('Add trailitem error', action.err);
      return state;
    default:
      return state;
  }
};

const getTrailDataReducer = (state = {}, action) => {
  switch (action.type) {
    case FETCH_TRAILITEMS:
      const newData = snapshotToArray(action.payload);
      console.log('I got new data');
      return { ...state, trailItems: newData };
    default:
      return state;
  }
};

const viewTrailItemIdReducer = (state = {}, action) => {
  switch (action.type) {
    case VIEW_TRAIL_ITEM:
      const newData = action.payload;
      console.log('I view trail item: ' + newData);
      return { ...state, trailItemId: newData };
    default:
      return state;
  }
};

const deleteTrailItemReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_TRAIL_ITEM:
      const newData = action.payload;
      console.log('I deleted trail item: ' + newData);
      return { ...state, trailItemId: newData };
    default:
      return state;
  }
};

const updateTrailItemReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_TRAIL_ITEM:
      console.log('I updated trail item: ' + action.payload);
      return { ...state, trailItemStatus: action.payload };
    default:
      return state;
  }
};

// const fetchUsersReducer = (state = {}, action) => {
//   switch (action.type) {
//     case FETCH_USERS:
//       const newData = snapshotToArray(action.payload);
//       console.log('I got new users');
//       console.log(newData);
//       return { ...state, userList: newData };
//     default:
//       return state;
//   }
// };

const usersReducer = (state = [], action) => {
  switch (action.type) {
    case FETCH_USERS:
      const newData = snapshotToArray(action.payload);
      console.log('I got new users');
      console.log(newData);
      return { ...state, userList: newData };
    case DELETE_USER:
      console.log('deleting user reducer firing');
      console.log(action.payload);
      const userEmail = action.payload;
      const newUserData = state.userList.filter((user) => {
        return user.email !== userEmail;
      });
      return { ...state, userList: newUserData };
    case ADD_USER:
      console.log('Reducer adding a user');
      const newUser = action.payload;
      const newUserList = state.userList.push(newUser);
      return { ...state, userList: newUserList };
    default:
      return state;
  }
};

const selectGroupReducer = (state = {}, action) => {
  switch (action.payload) {
    case 'Western Michigan Chapter':
      console.log('Yes case' + action.payload);
      return { localGroup: action.payload };
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  form: formReducer,
  auth,
  trailwork: trailworkReducer,
  trailData: getTrailDataReducer,
  localGroupChooser: selectGroupReducer,
  trailItemId: viewTrailItemIdReducer,
  deleteTrailItem: deleteTrailItemReducer,
  updateTrailItem: updateTrailItemReducer,
  fetchUsers: usersReducer,
  deleteUsers: usersReducer,
  addUser: usersReducer,
});

export default rootReducer;
