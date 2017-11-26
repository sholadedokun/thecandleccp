import { combineReducers } from 'redux';
// import { reducer as form } from 'redux-form';
import userReducer from './userReducer';
import campaignReducer from './campaignReducer';
import boardReducers from './boardReducer';

const rootReducer = combineReducers({
  // form,
  user:userReducer,
  campaigns:campaignReducer,
  boards:boardReducers
});
export default rootReducer;
