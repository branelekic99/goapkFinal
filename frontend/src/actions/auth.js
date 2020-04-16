import {LOGIN_SUCCESS,AUTH_ERROR,LOGOUT,CHECK_STATUS} from "./types";
import axios from 'axios';

//LOGIN FUNCTION

export function loadUser(){
    return function(dispatch,getState){
        const token = getState().auth.token;
        const header = "Token "+ token;
        axios("http://localhost:8000/api/auth/user",{
            headers:{
                'Content-Type':'aplication/json',
                "Authorization":header
            }
        })
        .then(result=>{
            console.log(result)
        })
        .catch(err=>{
            console.log(err);
            dispatch({
                type:AUTH_ERROR
            })
        })
    }
};

export function loginUser(obj){
    return function(dispatch){
        axios.post("http://localhost:8000/api/auth/login",obj)
        .then(result=>dispatch({
            type:LOGIN_SUCCESS,
            payload:result.data
        }))
        .catch(err=>{
            console.log(err);
            dispatch({
                type:AUTH_ERROR
            })
        })
    }
};
export function logOut(){
    return function(dispatch,getState){
        const token = getState().auth.token;
        const header = "Token "+ token;
        axios("http://localhost:8000/api/auth/user",null,{
            headers:{
                'Content-Type':'aplication/json',
                "Authorization":header
            }
        })
        .then(result=>dispatch({
            type:LOGOUT,
        }))
        .catch(err=>{
            console.log(err);
        })
    }
};

export function checkStatus(){
    return function(dispatch,getState){
        const token = getState().auth.token;
        if(token!=null){
            dispatch({
                type:CHECK_STATUS
            })
        }
    }
};