import { combineReducers } from "redux";

import { SET_FILTER, SET_MOVIES, SET_USERNAME, SET_USER } from "../constants";

function visibilityFilter(state = "", action) {
  switch (action.type) {
    case SET_FILTER:
      return action.value;
    default:
      return state;
  }
}

function movies(state = [], action) {
  switch (action.type) {
    case SET_MOVIES:
      return action.value;
    default:
      return state;
  }
}

function username(state = null, action) {
  switch (action.type) {
    case SET_USERNAME:
      return action.value;
    default:
      return state;
  }
}

function profile(state = null, action) {
  switch (action.type) {
    case SET_USER:
      return action.value;
    default:
      return state;
  }
}

const appReducers = combineReducers({
  visibilityFilter,
  movies,
  username,
  profile,
});

export default appReducers;
