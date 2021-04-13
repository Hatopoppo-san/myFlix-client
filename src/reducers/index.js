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

const currentState = {
  Username: null,
  Password: null,
  Email: null,
  Birthday: null,
  FavoriteMovies: [],
};

function profile(state = currentState, action) {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        Username: action.value.Username,
        Password: action.value.Password,
        Email: action.value.Email,
        Birthday: action.value.Birthday,
        FavoriteMovies: action.value.FavoriteMovies,
      };
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
