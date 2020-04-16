import {LOAD_USER,AUTH_ERROR,LOGIN_SUCCESS,LOGOUT,CHECK_STATUS} from "../actions/types";
const initialState = {
    token:localStorage.getItem("token"),
    isAuthenticated:false
}

export default function(state=initialState,action){
    switch(action.type){
        case LOAD_USER:
        case CHECK_STATUS:
            return{
                ...state,
                isAuthenticated:true
            }
        case AUTH_ERROR:
        case LOGOUT:
            localStorage.removeItem("token")
            return {
                ...state,
                token:null,
                isAuthenticated:false
            }
        case LOGIN_SUCCESS:
            localStorage.setItem('token',action.payload.token);
            return {
                ...state,
                ...action.payload,
                isAuthenticated:true
            }
        default:
            return state
    }
}