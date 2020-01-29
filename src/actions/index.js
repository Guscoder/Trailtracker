// Action Creator

// export const addTrailItem1 = formValues => {
//   //return an action
//   return {
//     type: "TrailItem_added",
//     payload: trailItem
//   };
// };

export const addTrailItem = formValues => {
  console.log("Yes the form action is working");
  return {
    type: "ADD_TRAILITEM",
    payload: formValues
  };
};
