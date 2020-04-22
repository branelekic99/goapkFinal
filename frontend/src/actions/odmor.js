import {ODMOR_DETIAL,ZAPOSLENI,ODMOR_UPDATE,ODMOR_LIST,ODMOR_DELETE,ADD_OMDOR,CONTROL_SWITCH,ERROR_MSG} from "../actions/types";
import axios from "axios";


export function getDetail(id){
    return function(dispatch,getState){
        // const token = getState().auth.token;
        // const header = "Token "+ token;
        const url = "http://localhost:8000/odmor/detail/"+id;
        // axios.get(url,{
        //     headers:{
        //         'Content-Type':'application/json',
        //         "Authorization":header
        //     }
        // })
        axios.get(url)
        .then(result=>{
            dispatch({
                type:ODMOR_DETIAL,
                payload:result.data
            })
        })
        .catch(err=>console.log(err))
    }
};

export function getZaposleni(){
    return function(dispatch){
        axios.get("http://localhost:8000/zaposleni/")
        .then(result=>dispatch({
            type:ZAPOSLENI,
            payload:result.data
        }))
        .catch(err=>console.log(err))
    }
};

export function updateDetail(obj){
    return function(dispatch,getState){
        const token = getState().auth.token;
        const header = "Token "+ token;
        const url = "http://localhost:8000/odmor/update/"+obj.id+"/";
        axios.put(url,obj,{
            headers:{
                'Content-Type':'application/json',
                "Authorization":header
            }
        })
        .then(result=>{
           dispatch({
               type:ODMOR_UPDATE,
               payload:result.data
           })
        })
        .catch(err=>{
            console.log(err.response);
            dispatch({
                type:ERROR_MSG,
                payload:err.response.data
            })
        })
    }
};

export function fetchData(){
    return function(dispatch){
        fetch("localhost:8000/odmor/list/")
        .then(result=>{
            dispatch({
                type:ODMOR_LIST,
                payload:result.data
            })
        })
        .catch(err=>console.log(err))
    }
};
export function controlSwitch(){
    return function(dispatch){
        dispatch({
            type:CONTROL_SWITCH
        })
    }
}

export function deleteData(obj){
    return function(dispatch,getState){
        const token = getState().auth.token;
        const header = "Token "+ token;
        const url = "http://localhost:8000/odmor/update/"+obj.id+"/";
        axios.delete(url,obj,{
            headers:{
                'Content-Type':'application/json',
                "Authorization":header
            }
        })
        .then(result=>{
            dispatch({
                type:ODMOR_DELETE,
                payload:obj.id
            })
        })
        .catch(err=>console.log(err))
    }
};

export function addOdmor(obj,ime){
    return function(dispatch){
        axios.post("http://localhost:8000/odmor/create/",obj)
        .then(response=>{
            response.data.zaposleni=ime
          dispatch({
              type:ADD_OMDOR,
              payload:response.data
          })
        })
        .catch(err=>{
            console.log(err)
            dispatch({
                type:ERROR_MSG,
                payload:err.response.data
            })
        })
    }
}