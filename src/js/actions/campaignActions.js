import axios from 'axios';
import { BrowserRouter as Router } from 'react-router-dom';
import {
  CAMPAIGN_CREATE,
  UNAUTH_USER,
  CAMPAIGN_ERROR,
  FETCH_CAMPAIGN
} from './actionTypes';

const ROOT_URL = 'http://thecandleapi.herokuapp.com/api';
export function createCampaign( payload ) {
    payload.token = localStorage.getItem('TheCandleToken')
  return function(dispatch) {
    return new Promise( (resolve)=>{
        // Submit email/password to the server
        axios.post(`${ROOT_URL}/campaigns`, payload)
            .then(response => {
                // If request is good...
                // - Update state to indicate user is authenticated
                dispatch({ type: CAMPAIGN_CREATE, payload: response});
                dispatch(fetchCampaign())
                resolve(response)


            })
            .catch(() => {
                // If request is bad...
                // - Show an error to the user
                dispatch(campaignError('Error Adding Campaign, Please try again.'));
            });
    })
  }
}

export function fetchCampaign() {
    console.log(localStorage.getItem('TheCandleToken'))

    return function(dispatch) {
        return new Promise( (resolve)=>{
            axios.get(`${ROOT_URL}/campaigns?token=${localStorage.getItem('TheCandleToken')}` )
            .then(response => {
                dispatch({ type: FETCH_CAMPAIGN, payload:response.data  });
                resolve(response)
            })
            .catch(error => {
                let errorData= error.response.data.error
                dispatch(campaignError(errorData));
            });
        })
    }
}

export function campaignError(error) {
  return {
    type: CAMPAIGN_ERROR,
    payload: error
  };
}

// export function deleteCampaign() {
//     return function(dispatch) {
//         axios.get(`${ROOT_URL}/inventory`, {
//             headers: { authorization: localStorage.getItem('TheCandleToken') }
//         })
//         .then(response => {
//             dispatch({
//                 type: FETCH_OFFERS,
//                 payload: response.data
//             });
//         });
//     }
// }