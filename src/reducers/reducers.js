import { combineReducers } from "redux";

import {
  SET_FILTER,
  SET_MOVIES,
  REGISTER_SUCCESS,
  UPDATE_PROFILE,
  DELETE_PROFILE,
  LOGIN_SUCCESS,
  LOGOUT,
  REGISTER_FAIL,
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

const user = JSON.parse(localStorage.getItem("user"));

const initialState = user
  ? { isLoggedIn: true, user }
  : { isLoggedIn: false, user: null };

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_SUCCESS:
      return {
        ...state,
        isLoggedIn: false,
      };
    case REGISTER_FAIL:
      return {
        ...state,
        isLoggedIn: false,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
        user: payload.user,
      };

    case LOGIN_FAIL:
      return {
        ...state,
        isLoggedIn: false,
        user: null,
      };
    // case UPDATE_PROFILE:
    //   return {
    //     ...state,
    //     user: {
    //       ...state.user,
    //       username: action.payload,
    //       password: action.payload,
    //       email: action.payload,
    //       birthday: action.payload,
    //     },
    //   };

    // case ADD_USER:
    //   return {
    //     ...state,
    //     user: {
    //       ...state.user,
    //       username: action.payload,
    //       password: action.payload,
    //       email: action.payload,
    //       birthday: action.payload,
    //     },
    //   };
    // case DELETE_USER:
    //   const updatedArr = state.user.filter((user) => user !== action.payload);
    //   return {
    //     ...state,
    //     updatedArr,
    //   };

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
