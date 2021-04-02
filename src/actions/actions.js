export const SET_MOVIES = "SET_MOVIES";
export const SET_FILTER = "SET_FILTER";
export const ADD_USER = "ADD_USER";
export const UPDATE_PROFILE = "UPDATE_PROFILE";
export const DELETE_PROFILE = "DELETE_PROFILE";
export const USER_LOGIN = "USER_LOGIN";
export const USER_LOGOUT = "USER_LOGOUT";

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

export function userLogin(user) {
  return {
    type: USER_LOGIN,
    payload: user,
  };
}

export function userLogout() {
  return {
    type: USER_LOGOUT,
  };
}

export function updateProfile(user) {
  return {
    type: UPDATE_PROFILE,
    payload: user,
  };
}

export function deleteProfile() {
  return {
    type: DELETE_PROFILE,
  };
}
