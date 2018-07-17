import {combineReducers} from 'redux';
import {formReducer as form} from 'fieldstack';
import onboarding from 'modules/Onboard/state';

const rootReducer = combineReducers({
  form,
  onboarding,
});

export default rootReducer;
