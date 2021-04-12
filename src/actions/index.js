import {
  SET_MOVIES,
  SET_FILTER,
  SET_USERNAME
} from '../constants';

export function setMovies(value) {
  return { type: SET_MOVIES, value };
}

export function setFilter(value) {
  return { type: SET_FILTER, value };
}

export function setUsername(value) {
  return { type: SET_USERNAME, value };
}
