import { CARD_ERROR, FETCH_ALL_CARDS, ADD_CARD, VALIDATE_CARD } from "../actions/actionTypes";

export default function(state = {}, action) {
	switch (action.type) {
		case ADD_CARD:
			return { ...state, error: "", cardDetails: action.payload };
		case FETCH_ALL_CARDS:
			return { ...state, error: "", allCards: action.payload };
		case VALIDATE_CARD:
			return { ...state, error: "", cardValidated: action.payload };
		case CARD_ERROR:
			return { ...state, error: action.payload };
	}
	return state;
}
