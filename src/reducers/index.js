import { combineReducers } from "redux";

import {
  SET_FILTER,
  SET_MOVIES,
  SET_USERNAME,
  SET_USER,
  SET_VALIDATED,
  SET_CHANGED_USER,
} from "../constants";

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

const initialState = {
  Username: "",
  Password: "",
  Email: "",
  Birthday: "",
  FavoriteMovies: [],
};

function profile(state = initialState, action) {
  switch (action.type) {
    case SET_USER:
      return action.value;
    default:
      return state;
  }
}

function isValidated(state = false, action) {
  switch (action.type) {
    case SET_VALIDATED:
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
  isValidated,
});

export default appReducers;
