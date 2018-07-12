import {
  ADSET_CREATE,
  ADSET_ERROR,
  FETCH_ADSET
} from '../actions/actionTypes';

export default function(state = {}, action) {
  switch(action.type) {
    case ADSET_CREATE:
        return { ...state, error: '', adsetData: action.payload };
    case FETCH_ADSET:
        return { ...state, error: '', allAdsets: action.payload};
    case ADSET_ERROR:
        return { ...state, error: action.payload, adsetData:'' };
  }
  return state;
}
