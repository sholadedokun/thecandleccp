import {
    BOARD_SELECT,
    BOARD_ERROR,
    FETCH_BOARD
} from '../actions/actionTypes';

export default function(state = {selectedBoards:[], allBoards:[]}, action) {
  switch(action.type) {
    case BOARD_SELECT:

        let newBoards=state.selectedBoards.push(action.payload);
        return { ...state, error: '', selectedBoards:newBoards  };
    case FETCH_BOARD:
        return { ...state, error: '', allBoards: action.payload};
    case BOARD_ERROR:
        return { ...state, error: action.payload, selectedBoards:'' };
  }
  return state;
}
