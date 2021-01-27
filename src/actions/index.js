import {
  trailItemsRef,
  storageRef,
  databaseRef,
} from "../services/firebaseConfig";

export const FETCH_TRAILITEMS = "FETCH_TRAILITEMS";
export const SELECT_GROUP = "SELECT_GROUP";
export const ADD_TRAIL_ITEM = "ADD_TRAIL_ITEM";
export const VIEW_TRAIL_ITEM = "VIEW_TRAIL_ITEM";
export const DELETE_TRAIL_ITEM = "DELETE_TRAIL_ITEM";
export const UPDATE_TRAIL_ITEM = "UPDATE_TRAIL_ITEM";
export const FETCH_USERS = "FETCH_USERS";
export const ADD_USER = "ADD_USER";
export const DELETE_USER = "DELETE_USER";
export const SORT_TRAIL_ITEMS = "SORT_TRAIL_ITEMS";

export const selectLocalGroup = (localGroup) => {
  console.log("goaction");
  return {
    type: SELECT_GROUP,
    payload: localGroup,
  };
};

export const addTrailItem = (newTrailItem, itemStatus) => async (dispatch) => {
  console.log("Yes the add trail item form action is working");
  console.log(itemStatus);

  let theId = new Date().getTime();
  let picture = newTrailItem.trail_image ? newTrailItem.trail_image[0] : "";

  newTrailItem["trailItemId"] = theId;
  newTrailItem["trailItemStatus"] = itemStatus || "submitted";
  if (picture) {
    console.log("there is a photo");
    storageRef.child("trailphotos/" + theId).put(picture);

    setTimeout(() => {
      storageRef
        .child("trailphotos/" + theId)
        .getDownloadURL()
        .then((url) => {
          newTrailItem["trailItemPhoto"] = url;

          databaseRef
            .child(newTrailItem.trailItemStatus + "items" || "activeitems")
            .child(newTrailItem.trailItemId)
            .set(newTrailItem)
            .then(() => {
              console.log("entered into database");
              alert("Trail Item Submitted!");
            });
        });
      return;
    }, 3000);
  } else {
    console.log("there is NO photo");
    console.log(newTrailItem);
    databaseRef
      .child(newTrailItem.trailItemStatus + "items" || "activeitems")
      .child(newTrailItem.trailItemId)
      .set(newTrailItem)
      .then(() => {
        console.log("entered into database");
        alert("Trail Item Submitted!");
      });
  }

  dispatch({
    type: ADD_TRAIL_ITEM,
    payload: null,
  });
};

export const fetchTrailItems = (listStatus) => async (dispatch) => {
  databaseRef.child(listStatus).once("value", (snapshot) => {
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

export const updateTrailItem = (itemStatus) => async (dispatch) => {
  dispatch({
    type: UPDATE_TRAIL_ITEM,
    payload: itemStatus,
  });
};

export const deleteTrailItem = (trailId) => async (dispatch) => {
  dispatch({
    type: DELETE_TRAIL_ITEM,
    payload: trailId,
  });
};

export const removeTrailItem = (removeTrailItem) => async (dispatch) => {
  trailItemsRef
    .child(removeTrailItem)
    .remove()
    .then(() => {
      alert("Item Deleted!");
    });
};

export const fetchUsers = () => async (dispatch) => {
  databaseRef.child("users").once("value", (snapshot) => {
    console.log(snapshot);
    dispatch({
      type: FETCH_USERS,
      payload: snapshot,
    });
  });
};

export const deleteUser = (userEmail) => async (dispatch) => {
  console.log("Deleting user from redux action");
  dispatch({
    type: DELETE_USER,
    payload: userEmail,
  });
};

export const addUser = (newUser) => async (dispatch) => {
  dispatch({
    type: ADD_USER,
    payload: newUser,
  });
};

export * from "./auth";
