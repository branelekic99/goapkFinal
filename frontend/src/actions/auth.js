import {LOGIN_SUCCESS,AUTH_ERROR,LOGOUT,LOAD_USER} from "./types";
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
        .then(result=>dispatch({
            type:LOAD_USER
        }))
        .catch(err=>{
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
            dispatch({
                type:AUTH_ERROR,
                payload:err.response.data
            })
        })
    }
};
export function logOut(){
    return function(dispatch,getState){
        const token = getState().auth.token;
        const header = "Token "+ token;
        axios.post("http://localhost:8000/api/auth/logout",null,{
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