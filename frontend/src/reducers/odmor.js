import {ODMOR_DETIAL,ZAPOSLENI,ODMOR_UPDATE,ODMOR_LIST,ODMOR_DELETE,ADD_OMDOR} from "../actions/types";
const initialState = {
    odmorList:[],
    detail:{},
    zaposleni:[],
    controlSwitch:false,
    message:false
}

export default function(state=initialState,action){
    switch(action.type){
        case ODMOR_LIST:
            return {
                ...state,
                odmorList:action.payload,
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
                controlSwitch:true
            }
        case ODMOR_UPDATE:
            const obj = state.odmorList.map((item)=>{
                if(item.id !== action.payload.id){
                    return item
                }
                const ime = item.zaposleni;
                return{
                    ...item,
                    ...action.payload
                }
            })
            return{
                ...state,
                odmorList:obj
            }
        case ODMOR_DELETE:
            var id = parseInt(action.payload);
            const pom_obj = state.odmorList.filter(item=>item !== id);
            return {
                ...state,
                odmorList:pom_obj,
                controlSwitch:true
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
