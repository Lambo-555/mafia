import {combineReducers} from "redux";
import mafiaReducer from './mafiaReducer'
import overlayReducer from './overlayReducer'

export default combineReducers({
  mafiaReducer: mafiaReducer,
  overlayReducer: overlayReducer,
  //else reducers
});