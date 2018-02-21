import axios from 'axios';
import { BrowserRouter as Router } from 'react-router-dom';
import {
  ADSET_CREATE,
  UNAUTH_USER,
  ADSET_ERROR,
  FETCH_ADSET
} from './actionTypes';


const ROOT_URL = 'http://thecandleapi.herokuapp.com/api';
export function createAdset( payload ) {
    // console.log(window.localStorage.getItem('TheCandleToken'))
    payload.token = localStorage.getItem('TheCandleToken')
  return function(dispatch) {
    return new Promise( (resolve)=>{
        // Submit email/password to the server

        axios.post(`${ROOT_URL}/adsets`, payload)
            .then(response => {
                // If request is good...
                // - Update state to indicate user is authenticated
                dispatch({ type: ADSET_CREATE, payload: response});
                // dispatch(fetchAdset())
                resolve(response.data)


            })
            .catch(() => {
                // If request is bad...
                // - Show an error to the user
                dispatch(adsetError('Error Adding Adset, Please try again.'));
            });
    })
  }
}

export function uploadCreative(creative) {
    return function(dispatch) {
        return new Promise( (resolve)=>{
            axios.post(`${ROOT_URL}/creatives`, creative, {
                headers: {
                    'Content-Type':  `multipart/form-data`
                }
            })
            .then(response => {
                dispatch({ type: FETCH_ADSET, payload:response.data });
                resolve(response)
            })
            .catch(error => {
                let errorData= error.response.data.error
                dispatch(adsetError(errorData));
            });
        })
    }
}

export function fetchAdset(campaign_id) {
    console.log(localStorage.getItem('TheCandleToken'))

    return function(dispatch) {
        return new Promise( (resolve)=>{
            axios.get(`${ROOT_URL}/adsets?token=${localStorage.getItem('TheCandleToken')}&campaign_id=${campaign_id}` )
            .then(response => {
                dispatch({ type: FETCH_ADSET, payload:response.data.data  });
                resolve(response)
            })
            .catch(error => {
                let errorData= error.response.data.error
                dispatch(adsetError(errorData));
            });
        })
    }
}
export function adsetError(error) {
  return {
    type: ADSET_ERROR,
    payload: error
  };
}

// export function deleteAdset() {
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
