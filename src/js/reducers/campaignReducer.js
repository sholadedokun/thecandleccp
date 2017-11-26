import {
  CAMPAIGN_CREATE,
  CAMPAIGN_ERROR,
  FETCH_CAMPAIGN
} from '../actions/actionTypes';

export default function(state = {}, action) {
  switch(action.type) {
    case CAMPAIGN_CREATE:
        return { ...state, error: '', campaignData: action.payload };
    case FETCH_CAMPAIGN:
        return { ...state, error: '', allCampaigns: action.payload};
    case CAMPAIGN_ERROR:
        return { ...state, error: action.payload, campaignData:'' };
  }
  return state;
}
