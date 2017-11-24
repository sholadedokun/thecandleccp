import { combineReducers } from 'redux';
// import { reducer as form } from 'redux-form';
import userReducer from './userReducer';

const rootReducer = combineReducers({
  // form,
  user:userReducer,
});
export default rootReducer;
