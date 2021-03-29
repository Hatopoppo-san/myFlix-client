import { combineReducers } from "redux";

import { SET_FILTER, SET_MOVIES, SET_LOGIN_STATE } from "../actions/actions";

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

const initialState = {
  username: "",
  password: "",
};

const userLogin = (state = initialState, action) => {
  switch (action.type) {
    case SET_LOGIN_STATE:
      return action.value;
    default:
      return state;
  }
};

const moviesApp = combineReducers({
  visibilityFilter,
  movies,
  userLogin,
});

export default moviesApp;
