import axios from "axios";
import { BrowserRouter as Router } from "react-router-dom";
import { PAYMENT_STATUS, REMOVE_CARD, VALIDATE_CARD, CARD_ERROR, ADD_CARD, FETCH_ALL_CARDS, VALIDATING_CARD_DETAILS, LOADING_PAYMENT_DETAIL } from "./actionTypes";
const ROOT_URL = "http://thecandleapi.herokuapp.com/api";
export function sendPayment(payload) {
	payload.token = localStorage.getItem("TheCandleToken");
	return function(dispatch) {
			axios.post(`${ROOT_URL}/pay`, payload)
				.then(response => {
					// If request is good...
					// - Update state to indicate user is authenticated
					dispatch({ type: PAYMENT_STATUS, payload: response });
					// dispatch(fetchAdset())
				})
				.catch(e => {
					console.log(e);
					dispatch(cardError(e.message));
					
				});
	};
}
export function addCard(payload) {
	return function(dispatch) {
		const token = localStorage.getItem("TheCandleToken");
		dispatch({type: VALIDATING_CARD_DETAILS, payload: true});
		axios.post(`${ROOT_URL}/cards`, {...payload, token})
		.then(response => {
			console.log(response);
			
			dispatch({ type: ADD_CARD, payload: response });
			return axios.get(`${ROOT_URL}/cards?token=${token}`);
		})
		.then(response => {
			dispatch({ type: FETCH_ALL_CARDS, payload: response.data });
		})
		.catch(e=>{
			console.log(e);
			
			dispatch(cardError(e.message));
		});
	};
}
export function getCards() {
	return function(dispatch) {
		dispatch({type: LOADING_PAYMENT_DETAIL, payload: true});
		axios.get(`${ROOT_URL}/cards?token=${localStorage.getItem("TheCandleToken")}`)
			.then(response => {
				// If request is good...
				// - Update state to indicate user is authenticated
				dispatch({ type: FETCH_ALL_CARDS, payload: response.data });
			})
			.catch(e => {
				console.log(e);
				dispatch(cardError(e.message));
			});
	};
}
export function validateOTP(payload) {
	payload.token = localStorage.getItem("TheCandleToken");
	payload.otp = 12345;
	return function(dispatch) {
			axios.post(`${ROOT_URL}/cards/validateotp`, payload)
				.then(response => {
					// If request is good...
					dispatch({ type: VALIDATE_CARD, payload: response });
				})
				.catch(e => {
					dispatch(cardError(e.message));
				});
	};
}
export function deleteCard(id) {
	let token = localStorage.getItem("TheCandleToken");
	return function(dispatch) {
			axios.delete(`${ROOT_URL}/cards/${id}?token=${token}&id=${id}`)
				.then(response => {
					// If request is good...
					response.id = id;
					dispatch({ type: REMOVE_CARD, payload: response });
				})
				.catch(e => {
					dispatch(cardError(e.message));
				});
	};
}
function cardError(error) {
	return {
		type: CARD_ERROR,
		payload: error
	};
}
