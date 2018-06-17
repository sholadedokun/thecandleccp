import { CARD_ERROR, FETCH_ALL_CARDS, ADD_CARD, VALIDATE_CARD, REMOVE_CARD } from "../actions/actionTypes";

export default function(state = {}, action) {
	switch (action.type) {
		case ADD_CARD:
			return { ...state, error: "", cardDetails: action.payload };
		case FETCH_ALL_CARDS:
			return { ...state, error: "", allCards: action.payload };
		case VALIDATE_CARD:
			return { ...state, error: "", cardValidated: action.payload.message };
		case CARD_ERROR:
			return { ...state, error: action.payload };
		case REMOVE_CARD:
			let newCardD = state.allCards.filter(item => item.id != action.payload.id);
			return { ...state, error: "", allCards: newCardD };
	}
	return state;
}
