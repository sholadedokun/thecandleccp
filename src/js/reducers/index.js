import { combineReducers } from 'redux';
// import { reducer as form } from 'redux-form';
import userReducer from './userReducer';
import campaignReducer from './campaignReducer';
import boardReducers from './boardReducer';
import adSetReducer from './adSetReducer';

const rootReducer = combineReducers({
  user:userReducer,
  campaigns:campaignReducer,
  boards:boardReducers,
  adSet:adSetReducer,
});
export default rootReducer;
