import axios from "axios";
import { BrowserRouter as Router } from "react-router-dom";
import { PAYMENT_STATUS, REMOVE_CARD, VALIDATE_CARD, CARD_ERROR, ADD_CARD, FETCH_ALL_CARDS } from "./actionTypes";
const ROOT_URL = "http://thecandleapi.herokuapp.com/api";
export function sendPayment(payload) {
	payload.token = localStorage.getItem("TheCandleToken");
	return function(dispatch) {
		return new Promise((resolve, reject) => {
			// Submit email/password to the server
			axios
				.post(`${ROOT_URL}/pay`, payload)
				.then(response => {
					// If request is good...
					// - Update state to indicate user is authenticated
					dispatch({ type: PAYMENT_STATUS, payload: response });
					// dispatch(fetchAdset())
					resolve(response.data);
				})
				.catch(e => {
					// If request is bad...
					// - Show an error to the user
					reject(e.response.data.message);
					dispatch(cardError(e.response.data.message));
				});
		});
	};
}
export function addCard(payload) {
	payload.token = localStorage.getItem("TheCandleToken");
	return function(dispatch) {
		return new Promise((resolve, reject) => {
			axios.post(`${ROOT_URL}/cards`, payload).then(
				response => {
					// If request is good...
					dispatch({ type: ADD_CARD, payload: response });
					resolve(response.data);
				},
				e => {
					reject();
					dispatch(cardError(e.response.data.message));
				}
			);
		});
	};
}
export function getCards() {
	return function(dispatch) {
		return new Promise((resolve, reject) => {
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
					reject();
					dispatch(cardError(e.response.data.message));
				});
		});
	};
}
export function validateOTP(payload) {
	payload.token = localStorage.getItem("TheCandleToken");
	payload.otp = 12345;
	return function(dispatch) {
		return new Promise((resolve, reject) => {
			axios
				.post(`${ROOT_URL}/cards/validateotp`, payload)
				.then(response => {
					// If request is good...
					dispatch({ type: VALIDATE_CARD, payload: response });
					getCards();
					resolve(response.data);
				})
				.catch(e => {
					reject(e.response.data);
					dispatch(cardError(e.response.data.message));
				});
		});
	};
}
export function deleteCard(id) {
	let token = localStorage.getItem("TheCandleToken");
	return function(dispatch) {
		return new Promise((resolve, reject) => {
			axios
				.delete(`${ROOT_URL}/cards/${id}?token=${token}&id=${id}`)
				.then(response => {
					// If request is good...
					response.id = id;
					dispatch({ type: REMOVE_CARD, payload: response });
					resolve(response.data);
				})
				.catch(e => {
					reject(e.response.data);
					dispatch(cardError(e.response.data.message));
				});
		});
	};
}
function cardError(error) {
	return {
		type: CARD_ERROR,
		payload: error
	};
}
