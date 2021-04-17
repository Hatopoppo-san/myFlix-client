import {
  SET_MOVIES,
  SET_FILTER,
  SET_USERNAME,
  SET_USER,
  SET_VALIDATED,
  SET_NEW_USERNAME,
  SET_NEW_EMAIL,
  SET_NEW_BIRTHDAY,
} from "../constants";

export function setMovies(value) {
  return { type: SET_MOVIES, value };
}

export function setFilter(value) {
  return { type: SET_FILTER, value };
}

export function setUsername(value) {
  return { type: SET_USERNAME, value };
}

export function setUser(value) {
  return { type: SET_USER, value };
}

export function setValidated(value) {
  return { type: SET_VALIDATED, value };
}

export function setNewUsername(value) {
  return { type: SET_NEW_USERNAME, value };
}

export function setNewEmail(value) {
  return { type: SET_NEW_EMAIL, value };
}

export function setNewBirthday(value) {
  return { type: SET_NEW_BIRTHDAY, value };
}
