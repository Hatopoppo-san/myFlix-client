export const SET_MOVIES = "SET_MOVIES";
export const SET_FILTER = "SET_FILTER";
export const SET_LOGIN_STATE = "SET_LOGIN_STATE";

export function setMovies(value) {
  return {
    type: SET_MOVIES,
    value,
  };
}

export function setFilter(value) {
  return {
    type: SET_FILTER,
    value,
  };
}

export function userLogin(username, password) {
  return {
    type: SET_LOGIN_STATE,
    username,
    password,
  };
}
