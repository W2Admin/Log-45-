import axios from "axios"
import { ALL_USER_FALIURE, ALL_USER_REQUEST, ALL_USER_SUCCESS, USER_FALIURE, USER_REQUEST, USER_SUCCESS } from "./UserType"

//GET CURRENT LOGIN USER
export const userRequest = () =>{
    return{
        type: USER_REQUEST
    }
}

export const userSuccess = (response) =>{
    return{
        type: USER_SUCCESS,
        payload: response
    }
}

export const userFaliure = (error) =>{
    return{
        type: USER_FALIURE,
        payload: error
    }
}


//GET ALL USER
export const alluserRequest = () =>{
    return{
        type: ALL_USER_REQUEST
    }
}

export const alluserSuccess = (response) =>{
    return{
        type: ALL_USER_SUCCESS,
        payload: response
    }
}

export const alluserFaliure = (error) =>{
    return{
        type: ALL_USER_FALIURE,
        payload: error
    }
}

const baseURL = "https://med-farm.onrender.com/api"
//GET Single user
export const fetchuser = () => {
    return(dispatch) => {
        dispatch(userRequest())
        let datas = JSON.parse(localStorage.getItem("auth"))
        const headers = {
            "Content-Type": "application/json",
            authorization: `JWT ${datas?.token?.access}`,
        };
        // let datas = JSON.parse(localStorage.getItem("auth"))
        axios.get(`${baseURL}/users/me/`, { headers: headers })
            .then( response => {
                const data = response.data
                dispatch(userSuccess(data))
            })
            .catch(error =>{
                const errorMsg = error.message
                dispatch(userFaliure(errorMsg))
            })
    }
}

//GET Single user
export const allfetchuser = () => {
    return(dispatch) => {
        dispatch(alluserRequest())
        let datas = JSON.parse(localStorage.getItem("auth"))
        const headers = {
            "Content-Type": "application/json",
            authorization: `JWT ${datas?.token?.access}`,
        };
        // let datas = JSON.parse(localStorage.getItem("auth"))
        axios.get(`${baseURL}/receptionists/`, { headers: headers })
            .then( response => {
                const data = response.data
                dispatch(alluserSuccess(data))
            })
            .catch(error =>{
                const errorMsg = error.message
                dispatch(alluserFaliure(errorMsg))
            })
    }
}