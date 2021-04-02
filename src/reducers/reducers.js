import { combineReducers } from "redux";

import {
  SET_FILTER,
  SET_MOVIES,
  UPDATE_PROFILE,
  DELETE_PROFILE,
  LOGIN,
  LOGOUT,
  ADD_USER,
} from "../actions/actions";

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

const userReducer = (user = {}, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...user,
        isLoggedIn: true,
        user: action.payload,
      };

    case LOGOUT:
      return {
        user: null,
      };

    case UPDATE_PROFILE:
      return {
        ...user,
        ...action.payload,
      };

    case ADD_USER:
      return {
        ...user,
        ...action.payload,
      };
    case DELETE_PROFILE:
      return {};

    default:
      return state;
  }
};

const moviesApp = combineReducers({
  visibilityFilter,
  movies,
  userReducer,
});

export default moviesApp;
