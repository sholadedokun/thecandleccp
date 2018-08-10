import { CARD_ERROR, FETCH_ALL_CARDS, ADD_CARD, VALIDATE_CARD, REMOVE_CARD, LOADING_PAYMENT_DETAIL, VALIDATING_CARD_DETAILS, ADDING_NEW_CARD, GET_TRANSACTIONS } from "../actions/actionTypes";

export default function(state = { loadingPaymentDetails: true }, action) {
	switch (action.type) {
		case ADDING_NEW_CARD:
			return { ...state, error: "", addingNewCard: true };
		case VALIDATING_CARD_DETAILS:
			return { ...state, error: "", validatingCard: true };
		case LOADING_PAYMENT_DETAIL:
			return { ...state, error: "", loadingPaymentDetails: true };
		case ADD_CARD:
			return { ...state, error: "", flwRef: action.payload.flwRef, otpMessage: action.payload.message, validatingCard: false, addingNewCard: false };
		case FETCH_ALL_CARDS:
			return { ...state, error: "", allCards: action.payload, loadingPaymentDetails: false };
		case VALIDATE_CARD:
			return { ...state, error: "", cardValidated: action.payload.message };
		case CARD_ERROR:
			return { ...state, error: action.payload, validatingCard: false };
		case REMOVE_CARD:
			let newCardD = state.allCards.filter(item => item.id != action.payload.id);
			return { ...state, error: "", allCards: newCardD };
		case GET_TRANSACTIONS:
			return { ...state, error: "", transactions: action.payload };
	}
	return state;
}
