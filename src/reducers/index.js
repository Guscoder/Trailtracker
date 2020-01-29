import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";

const initTrailworkState = {
  trailItems: [
    {
      id: 1,
      local_chapter: "WMC",
      reporting_person: "Eric Gustafson",
      sawyer_name: "Bubba Gump",
      date_found: "03/45/2019",
      trail_entrance: "Mile Marker 3",
      distance: "3.5 miles"
    },
    {
      id: 2,
      local_chapter: "WMC",
      reporting_person: "George Gustafson",
      sawyer_name: "Calvin Johnson",
      date_found: "05/23/2019",
      trail_entrance: "Mile Marker 1",
      distance: "1.5 miles"
    }
  ]
};

const trailworkReducer = (state = initTrailworkState, action) => {
  switch (action.type) {
    case "ADD_TRAILITEM":
      console.log("created item", action.payload);
      return { ...state, trailItems: [...state.trailItems, action.payload] };
    case "ADD_TRAILITEM_ERROR":
      console.log("Add trailitem error", action.err);
      return state;
    default:
      return state;
  }
};

const authReducer = (state = {}, action) => {
  return state;
};

const rootReducer = combineReducers({
  form: formReducer,
  auth: authReducer,
  trailwork: trailworkReducer
});

export default rootReducer;
