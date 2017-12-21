import {
  AUTH_USER,
  UNAUTH_USER,
  AUTH_ERROR,
  FETCH_USER
} from '../actions/actionTypes';

export default function(state = {}, action) {
  switch(action.type) {
    case AUTH_USER:
      return { ...state, error: '', authenticated: true };
    case UNAUTH_USER:
      return { ...state, error: 'you are not authorized to view this page.', authenticated: false };
    case AUTH_ERROR:
      return { ...state, error: action.payload };
     case FETCH_USER:
        return {...state, data:action.payload}
  }
  return state;
}
