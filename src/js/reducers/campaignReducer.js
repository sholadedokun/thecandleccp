import {
  CAMPAIGN_CREATE,
  CAMPAIGN_ERROR
} from '../actions/actionTypes';

export default function(state = {}, action) {
  switch(action.type) {
    case CAMPAIGN_CREATE:
      return { ...state, error: '', campaignData: action.payload };
    case CAMPAIGN_ERROR:
        return { ...state, error: action.payload, campaignData:'' };
  }
  return state;
}
