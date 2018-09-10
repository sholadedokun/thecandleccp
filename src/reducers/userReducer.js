import { AUTH_USER, UNAUTH_USER, AUTH_ERROR, FETCH_USER, SWITCH_MODAL_STATE, SET_EMAIL, UPDATE_USER_DETAILS, UPDATE_USER_PASSWORD } from "../actions/actionTypes";

export default function(state = { error: [], modalState: { isOpen: false, page: null } }, action) {
	switch (action.type) {
		case AUTH_USER:
			return { ...state, error: [], authenticated: true };
		case UNAUTH_USER:
			return { ...state, error: [], authenticated: false };
		case AUTH_ERROR:
			return { ...state, error: [action.payload] };
		case FETCH_USER:
			return { ...state, error: [], data: action.payload };
		case SET_EMAIL:
			return { ...state, error: [], regEmail: action.payload };
		case SWITCH_MODAL_STATE:
			return { ...state, error: [], modalState: action.payload };
		case UPDATE_USER_DETAILS:
			return { ...state, error: [], data: action.payload };
		case UPDATE_USER_PASSWORD:
			return { ...state, passwordUpdated: true };
	}
	return state;
}
