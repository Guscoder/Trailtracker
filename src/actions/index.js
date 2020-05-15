import React from 'react';
import { trailItemsRef, storageRef } from '../firebaseConfig';

export const FETCH_TRAILITEMS = 'FETCH_TRAILITEMS';
export const SELECT_GROUP = 'SELECT_GROUP';
export const ADD_TRAIL_ITEM = 'ADD_TRAIL_ITEM';
export const VIEW_TRAIL_ITEM = 'VIEW_TRAIL_ITEM';
export const DELETE_TRAIL_ITEM = 'DELETE_TRAIL_ITEM';
export const UPDATE_TRAIL_ITEM = 'UPDATE_TRAIL_ITEM';

export const selectLocalGroup = (localGroup) => {
  console.log('goaction');
  return {
    type: SELECT_GROUP,
    payload: localGroup,
  };
};

export const addTrailItem = (newTrailItem) => async (dispatch) => {
  console.log('Yes the add trail item form action is working');

  let theId = new Date().getTime();
  let picture = newTrailItem.trail_image[0];

  newTrailItem['trailItemId'] = theId;

  // newTrailItem['trailPhotoId'] = theId;

  storageRef.child('trailphotos/' + theId).put(picture);

  setTimeout(() => {
    storageRef
      .child('trailphotos/' + theId)
      .getDownloadURL()
      .then((url) => {
        newTrailItem['trailItemPhoto'] = url;
        trailItemsRef.child(newTrailItem.trailItemId).set(newTrailItem);
      });
    return;
  }, 3000);

  dispatch({
    type: ADD_TRAIL_ITEM,
    payload: null,
  });
};

export const fetchTrailItems = () => async (dispatch) => {
  trailItemsRef.on('value', (snapshot) => {
    dispatch({
      type: FETCH_TRAILITEMS,
      payload: snapshot,
    });
  });
};

export const viewTrailItemId = (trailId) => async (dispatch) => {
  dispatch({
    type: VIEW_TRAIL_ITEM,
    payload: trailId,
  });
};

export const updateTrailItem = (updatedTrailItem) => async (dispatch) => {
  dispatch({
    type: UPDATE_TRAIL_ITEM,
    payload: updatedTrailItem,
  });
};

export const deleteTrailItem = (trailId) => async (dispatch) => {
  dispatch({
    type: DELETE_TRAIL_ITEM,
    payload: trailId,
  });
};

// export const getTrailItem = (trailItem) => async (dispatch) => {
//   if (this.props.trailItems) {
//     return this.props.trailItems.filter((trailItem) => {
//       return <ViewTrailItem trailItem={trailItem} />;
//     });
//   } else {
//     return (
//       <p>Did not find the trail item</p>
//     );
// };

export const removeTrailItem = (removeTrailItem) => async (dispatch) => {
  trailItemsRef.child(removeTrailItem).remove();
};

// Action Creator

// export const addTrailItem = formValues => {
//   console.log("Yes the form action is working");
//   return {
//     type: "ADD_TRAILITEM",
//     payload: formValues
//   };
// };

// export const addTrailItem2 = formValues => {
//   console.log("Yes the form action is working");
//   return (dispatch, getState, { getFirebase }) => {
//     // make async call to database
//     const firestore = getFirestore();
//     firestore.collections("trailworkItems").add({});
//     dispatch({ type: "ADD_TRAILITEM", payload: formValues });
//   };
// };
