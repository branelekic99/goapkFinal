import {ODMOR_DETIAL,ZAPOSLENI,ODMOR_UPDATE,ODMOR_LIST,ODMOR_DELETE,ADD_OMDOR,CONTROL_SWITCH,ERROR_MSG} from "../actions/types";
const initialState = {
    odmorList:[],
    count:0,
    next:null,
    previous:null,
    detail:{},
    zaposleni:[],
    controlSwitch:false,
    successful_update:false,
    error_status:false,
    error_msg:[]
}

export default function(state=initialState,action){
    switch(action.type){
        case CONTROL_SWITCH:
            return {
                ...state,
                controlSwitch:false,
                successful_update:false,
                error_status:false
            }
        case ODMOR_LIST:
            return {
                ...state,
                odmorList:action.payload.results,
                count:action.payload.count,
                next:action.payload.next,
                previous:action.payload.previous,
                controlSwitch:false
            }
        case ODMOR_DETIAL:
            return{
                ...state,
                detail:action.payload
            }
        case ADD_OMDOR:
            const item = action.payload;
            const new_list = state.odmorList.concat(item)
            return{
                ...state,
                odmorList:new_list,
                error_status:false,
                controlSwitch:true
            }
        case ODMOR_UPDATE:
            const obj = state.odmorList.map((item)=>{
                if(item.id !== action.payload.id){
                    return item
                }
                return{
                    ...item,
                    ...action.payload,
                }
            })
            return{
                ...state,
                odmorList:obj,
                detail:action.payload,
                successful_update:true,
                error_status:false
            }
        case ODMOR_DELETE:
            var id = parseInt(action.payload);
            const pom_obj = state.odmorList.filter(item=>item !== id);
            return {
                ...state,
                odmorList:pom_obj,
                controlSwitch:true
            }
        case ERROR_MSG:
            const msges = Object.values(action.payload);
            console.log(msges)
            return {
                ...state,
                error_status:true,
                error_msg:msges
            }
        case ZAPOSLENI:
            return{
                ...state,
                zaposleni:action.payload
            }
        default:
            return state
    }
};
