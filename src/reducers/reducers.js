import { combineReducers } from "redux";

import {
  SET_FILTER,
  SET_MOVIES,
  UPDATE_PROFILE,
  DELETE_PROFILE,
  USER_LOGIN,
  USER_LOGOUT,
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

const initialState = {
  username: "",
  email: "",
  birthday: "",
  favoriteMovies: [],
  isLoggedIn: false,
};

function userReducer(state = initialState, action) {
  switch (action.type) {
    case USER_LOGIN:
      return {
        ...state,
        username: action.payload,
        isLoggedIn: true,
      };

    case USER_LOGOUT:
      return {
        ...state,
        username: "",
        isLoggedIn: false,
      };

    case UPDATE_PROFILE:
      return {
        ...state,
        username: action.payload,
        email: action.payload,
        birthday: action.payload,
      };

    case ADD_USER:
      return {
        ...state,
        username: action.payload,
        email: action.payload,
        birthday: action.payload,
        favoriteMovies: [],
      };

    case DELETE_PROFILE:
      return {};

    default:
      return state;
  }
}

const moviesApp = combineReducers({
  visibilityFilter,
  movies,
  userReducer,
});

export default moviesApp;
