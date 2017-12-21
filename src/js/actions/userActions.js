import axios from 'axios';
import { BrowserRouter as Router } from 'react-router-dom';
import {
  AUTH_USER,
  UNAUTH_USER,
  AUTH_ERROR,
  FETCH_OFFERS,
  SWITCH_MODAL_STATE
} from './actionTypes';

const ROOT_URL = 'http://thecandleapi.herokuapp.com/api';

export function signinUser( email, password ) {
  return function(dispatch) {
    return new Promise( (resolve, reject)=>{
        // Submit email/password to the server
        axios.post(`${ROOT_URL}/auth/login`, { email, password })
            .then(response => {
                // If request is good...
                // - Update state to indicate user is authenticated
                dispatch({ type: AUTH_USER });
                // - Save the JWT token
                localStorage.setItem('TheCandleToken', response.data.token);
                resolve(response)
            })
            .catch(() => {
                reject();
                // If request is bad...
                // - Show an error to the user
                dispatch(authError('Wrong Login credentials, Please try again.'));
            });
    })
  }
}

export function signUpUser(values) {
    return function(dispatch) {
        return new Promise( (resolve, reject)=>{
            axios.post(`${ROOT_URL}/auth/register`, values)
            .then(response => {

                dispatch({ type: AUTH_USER });
                localStorage.setItem('TheCandleToken', response.data.token);
                resolve (response)
            })
            .catch(error => {
                reject();
                let errorData= error.response.data.error
                dispatch(authError(errorData));
            });
        })
    }
}

export function authError(error) {
  return {
    type: AUTH_ERROR,
    payload: error
  };
}

export function signoutUser() {
  localStorage.removeItem('TheCandleToken');
  return { type: UNAUTH_USER };
}
export function modalStatus(state, page){
    return function(dispatch){
        dispatch({
            type: SWITCH_MODAL_STATE,
            payload:{isOpen:state, page}
        });
    }
}
export function fetchProduct() {
    return function(dispatch) {
        axios.get(`${ROOT_URL}/inventory`, {
            headers: { authorization: localStorage.getItem('TheCandleToken') }
        })
        .then(response => {
            dispatch({
                type: FETCH_OFFERS,
                payload: response.data
            });
        });
    }
}
