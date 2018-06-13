import axios from "axios";
import { BrowserRouter as Router } from "react-router-dom";
import { ADSET_CREATE, VALIDATE_CARD, CARD_ERROR, ADD_CARD, FETCH_ALL_CARDS } from "./actionTypes";

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
				.catch(e => {
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
export function getCards() {
	return function(dispatch) {
		return new Promise(resolve => {
			axios
				.get(`${ROOT_URL}/cards?token=${localStorage.getItem("TheCandleToken")}`)
				.then(response => {
					// If request is good...
					// - Update state to indicate user is authenticated
					dispatch({ type: FETCH_ALL_CARDS, payload: response.data });
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
export function validateOTP(payload) {
	payload.token = localStorage.getItem("TheCandleToken");
	payload.otp = 12345;
	return function(dispatch) {
		return new Promise(resolve => {
			axios
				.post(`${ROOT_URL}/cards/validateotp`, payload)
				.then(response => {
					// If request is good...
					dispatch({ type: VALIDATE_CARD, payload: response });
					resolve(response.data);
				})
				.catch(e => {
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
