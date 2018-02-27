import axios from 'axios';
import { BrowserRouter as Router } from 'react-router-dom';
import {
  AUTH_USER,
  UNAUTH_USER,
  AUTH_ERROR,
  FETCH_USER,
  SWITCH_MODAL_STATE,
  NO_INTERNET,
} from './actionTypes';
import _ from 'lodash'

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
            // dispatch(fetchUser())
            resolve(response)
        })
        .catch((error) => {
            if(!error.response){
                dispatch(authError(NO_INTERNET))
            }
            reject();
            // If request is bad...
            // - Show an error to the user
            dispatch(authError(['Wrong Login credentials, Please try again.']));
        });
    })
  }
}

export function signUpUser(values) {
    return function(dispatch) {
        return new Promise( (resolve, reject)=>{
            axios.post(`${ROOT_URL}/auth/register`, values)
            .then(response =>{
                dispatch({ type: AUTH_USER });
                // localStorage.setIte('TheCandleToken', response.data.token);
                resolve (response.data)
            })
            .catch(error => {
                if(!error.response){
                    dispatch(authError(NO_INTERNET))
                }
                reject(error.response.data.message);
                let errorMap=_.map(error.response.data.message, (item, index)=>item)
                dispatch(authError(errorMap));
            });
        })
    }
}
export function authError(error){
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
export function fetchUser() {
    return function(dispatch) {
        axios.get(`${ROOT_URL}/user?token=${localStorage.getItem('TheCandleToken')}`, )
        .then(response => {
            dispatch({
                type: FETCH_USER,
                payload: response.data
            });
        })
        .catch(error => {

            if(!error.response){
                dispatch(authError(NO_INTERNET))
            }
            else if(error.response.data.message=='Invalid token'){
                dispatch(signoutUser(error.response.data.message));
                dispatch(authError(error.response.data.message));
            }

        });
    }
}
