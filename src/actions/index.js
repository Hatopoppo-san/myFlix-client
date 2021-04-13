import { SET_MOVIES, SET_FILTER, SET_USERNAME, SET_USER } from "../constants";

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
