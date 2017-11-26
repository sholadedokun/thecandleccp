import axios from 'axios';
import { BrowserRouter as Router } from 'react-router-dom';
import {
  BOARD_SELECT,
  BOARD_ERROR,
  FETCH_BOARD
} from './actionTypes';

const ROOT_URL = 'http://thecandleapi.herokuapp.com/api';

export function selectBoard( boardId ) {
    return function(dispatch) {
        dispatch({ type: BOARD_SELECT, payload: boardId});
    }
}

export function fetchBoard() {
    return function(dispatch) {
        return new Promise( (resolve)=>{
            axios.get(`${ROOT_URL}/campaigns?token=${localStorage.getItem('TheCandleToken')}` )
            .then(response => {
                dispatch({ type: FETCH_BOARD, payload:response.data.data  });
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
    type: BOARD_ERROR,
    payload: error
  };
}

// export function deleteBoard() {
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
