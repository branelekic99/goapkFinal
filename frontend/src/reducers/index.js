import {combineReducers} from 'redux';
import authReducer from "./auth";
import odmorReducer from "./odmor";

export default combineReducers({
    auth:authReducer,
    odmor:odmorReducer
});