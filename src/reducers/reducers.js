import { combineReducers } from "redux";

import {
  SET_FILTER,
  SET_MOVIES,
  UPDATE_PROFILE,
  DELETE_PROFILE,
  USER_LOGIN,
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
  password: "",
  email: "",
  birthday: "",
  favoriteMovies: [],
};

function userReducer(state = initialState, action) {
  switch (action.type) {
    case USER_LOGIN:
      let usernameAssign = Object.assign({
        username: action.payload,
        password: action.payload,
        state,
      });
      return {
        usernameAssign,
      };

    case UPDATE_PROFILE:
      let profileAssign = Object.assign({
        username: action.payload,
        email: action.payload,
        birthday: action.payload,
        state,
      });
      return {
        profileAssign,
      };

    case ADD_USER:
      let addUserAssign = Object.assign({
        username: action.payload,
        password: action.payload,
        email: action.payload,
        birthday: action.payload,
        favoriteMovies: [],
        state,
      });
      return {
        addUserAssign,
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
