import { combineReducers } from "redux";
import { nasaReducer } from './nasaReducer';

const rootReducer = combineReducers({nasa: nasaReducer});

export default rootReducer;

