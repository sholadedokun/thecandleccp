import axios from "axios";
import { BrowserRouter as Router } from "react-router-dom";
import { ADSET_CREATE, UNAUTH_USER, CARD_ERROR, ADD_CARD } from "./actionTypes";

const ROOT_URL = "http://thecandleapi.herokuapp.com/api";
export function sendPayment(payload) {
	payload.token = localStorage.getItem("TheCandleToken");
	return function(dispatch) {
		return new Promise(resolve => {
			// Submit email/password to the server
			axios
				.post(`${ROOT_URL}/pay`, payload)
				.then(response => {
					// If request is good...
					// - Update state to indicate user is authenticated
					dispatch({ type: ADSET_CREATE, payload: response });
					// dispatch(fetchAdset())
					resolve(response.data);
				})
				.catch((e) => {
					// If request is bad...
					// - Show an error to the user
					dispatch(cardError(e.response.data.message));
				});
		});
	};
}
export function addCard(payload) {
	payload.token = localStorage.getItem("TheCandleToken");
	return function(dispatch) {
		return new Promise(resolve => {
			// Submit email/password to the server
			axios
				.post(`${ROOT_URL}/cards`, payload)
				.then(response => {
					// If request is good...
					// - Update state to indicate user is authenticated
					dispatch({ type: ADD_CARD, payload: response });
					// dispatch(fetchAdset())
					resolve(response.data);
				})
				.catch(e => {
					// If request is bad...
					// - Show an error to the user
					dispatch(cardError(e.response.data.message));
				});
		});
	};
}
export function cardError(error) {
	return {
		type: CARD_ERROR,
		payload: error
	};
}
