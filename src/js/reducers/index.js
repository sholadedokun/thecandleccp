import { combineReducers } from 'redux';
// import { reducer as form } from 'redux-form';
import userReducer from './userReducer';
import campaignReducer from './campaignReducer';

const rootReducer = combineReducers({
  // form,
  user:userReducer,
  campaign:campaignReducer
});
export default rootReducer;
