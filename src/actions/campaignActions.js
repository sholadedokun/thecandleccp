import axios from "axios";
import { BrowserRouter as Router } from "react-router-dom";
import { CAMPAIGN_CREATE, CAMPAIGN_SAVE, DELETE_CREATE, CAMPAIGN_ERROR, FETCH_CAMPAIGN } from "./actionTypes";

const ROOT_URL = "http://thecandleapi.herokuapp.com/api";
export function createCampaign(payload, first) {
	payload.token = localStorage.getItem("TheCandleToken");
	return function(dispatch) {
		return new Promise((resolve, reject) => {
			// Submit email/password to the server
			axios
				.post(`${ROOT_URL}/campaigns`, payload)
				.then(response => {
					// If request is good...
					// - Update state to indicate user is authenticated
					dispatch({ type: CAMPAIGN_CREATE, payload: response });
					resolve(response);
				})
				.catch(() => {
					// If request is bad...
					// - Show an error to the user
					reject();
					dispatch(campaignError("Error Adding Campaign, Please try again."));
				});
		});
	};
}

export function saveCampaign(payload) {
	return function(dispatch) {
		return new Promise(resolve => {
			dispatch({ type: CAMPAIGN_SAVE, payload });
			resolve();
		});
	};
}
export function deleteCampaign(toDelete) {
	return function(dispatch) {
		return new Promise((resolve, reject) => {
			// Submit email/password to the server
			for (let x = 0; x < toDelete.length; x++) {
				axios
					.delete(`${ROOT_URL}/campaigns/${toDelete[x]}?token=${localStorage.getItem("TheCandleToken")}&id=${toDelete[x]}`)
					.then(response => {
						// If request is good...
						// - Update state to indicate user is authenticated
						dispatch({ type: DELETE_CREATE, payload: response });
						if (x == toDelete.length - 1) {
							dispatch(fetchCampaign());
							resolve(response);
						}
					})
					.catch(() => {
						// If request is bad...
						// - Show an error to the user
						reject();
						dispatch(campaignError("Error Adding Campaign, Please try again."));
					});
			}
		});
	};
}

export function fetchCampaign() {
	return function(dispatch) {
		return new Promise((resolve, reject) => {
			axios
				.get(`${ROOT_URL}/campaigns?token=${localStorage.getItem("TheCandleToken")}`)
				.then(response => {
					dispatch({ type: FETCH_CAMPAIGN, payload: response.data });
					resolve(response);
				})
				.catch(error => {
					reject();
					// let errorData= error.response.data.error
					dispatch(campaignError(error));
				});
		});
	};
}

export function campaignError(error) {
	return {
		type: CAMPAIGN_ERROR,
		payload: error
	};
}
