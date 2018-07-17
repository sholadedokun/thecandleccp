import { BOARD_SELECT, BOARD_ERROR, FETCH_BOARD } from "../actions/actionTypes";

export default function(state = { selectedBoards: [], allBoards: [] }, action) {
	switch (action.type) {
		case BOARD_SELECT:
			return { ...state, error: "", selectedBoards: state.selectedBoards.concat(action.payload) };
		case FETCH_BOARD:
			return { ...state, error: "", allBoards: action.payload };
		case BOARD_ERROR:
			return { ...state, error: action.payload, selectedBoards: "" };
	}
	return state;
}
