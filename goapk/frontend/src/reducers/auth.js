import {LOAD_USER,AUTH_ERROR,LOGIN_SUCCESS,LOGOUT,CHECK_STATUS} from "../actions/types";
const initialState = {
    token:localStorage.getItem("token"),
    isAuthenticated:false,
    error_status:false,
    error_msg:[]
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
            localStorage.removeItem("token")
            console.log(action.payload)
            let error_msges = [];
            for( let [key,value] of Object.entries(action.payload)){
                error_msges.push({
                    [key]:value
                })
            }
            return{
                ...state,
                token:null,
                isAuthenticated:false,
                error_status:true,
                error_msg:error_msges
            }
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