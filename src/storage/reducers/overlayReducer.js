import {OVERLAY_CLOSE, OVERLAY_OPEN} from "../actions/actionTypes";

const initialState = {
  isOpen: false,
  player: false,
};

export default function overlayReducer(state = initialState, action) {
  switch (action.type) {
    case OVERLAY_CLOSE:
      return {...state, isOpen: false, player: ''};
    case OVERLAY_OPEN:
      return {...state, isOpen: true, player: action.payload};
    default:
      return {...state};
  }
}