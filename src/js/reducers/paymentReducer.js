import { ADSET_CREATE, CARD_ERROR, FETCH_ADSET, ADD_CARD } from "../actions/actionTypes";

export default function(state = {}, action) {
	switch (action.type) {
		case ADSET_CREATE:
			return { ...state, error: "", adsetData: action.payload };
		case FETCH_ADSET:
			return { ...state, error: "", allAdsets: action.payload };
		case CARD_ERROR:
			return { ...state, error: action.payload };
	}
	return state;
}
