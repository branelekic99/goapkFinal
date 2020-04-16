import {ODMOR_DETIAL,ZAPOSLENI,ODMOR_UPDATE,ODMOR_LIST,ODMOR_DELETE,ADD_OMDOR} from "../actions/types";
const initialState = {
    odmorList:[],
    detail:{},
    zaposleni:[]
}

export default function(state=initialState,action){
    switch(action.type){
        case ODMOR_LIST:
            return {
                ...state,
                odmorList:action.payload
            }
        case ODMOR_DETIAL:
            return{
                ...state,
                detail:action.payload
            }
        case ADD_OMDOR:
            return{
                ...state,
                odmorList:state.odmorList.concat(action.payload)
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
            var pom_obj = state.odmorList;
            pom_obj = pom_obj.filter((item)=>item.id !== action.payload)
            return {
                ...state,
                odmorList:pom_obj
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
