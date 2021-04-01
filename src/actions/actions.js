export const SET_MOVIES = "SET_MOVIES";
export const SET_FILTER = "SET_FILTER";
export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const REGISTER_FAIL = "REGISTER_FAIL";
export const UPDATE_PROFILE = "UPDATE_PROFILE";
export const DELETE_PROFILE = "DELETE_PROFILE";
export const LOGIN_SUCCESS = "LOGIN";
export const LOGOUT = "LOGOUT";

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

export function registerSuccess(user) {
  return {
    type: REGISTER_SUCCESS,
    payload: { user },
  };
}

export function registerFail() {
  return {
    type: REGISTER_FAIL,
  };
}

export function loginSuccess(user) {
  return {
    type: LOGIN_SUCCESS,
    payload: { user },
  };
}

export function loginFail() {
  return {
    type: LOGIN_FAIL,
  };
}

export function logout() {
  return {
    type: LOGOUT,
  };
}

export function updateProfile(user) {
  return {
    type: UPDATE_PROFILE,
    payload: { user },
  };
}

export function deleteProfile(user) {
  return {
    type: DELETE_PROFILE,
    payload: { user },
  };
}
