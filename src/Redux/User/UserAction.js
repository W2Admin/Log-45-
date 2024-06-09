import axios from "axios"
import { ALL_USER_FALIURE, ALL_USER_REQUEST, ALL_USER_SUCCESS, CREATE_USER_FALIURE, CREATE_USER_REQUEST, CREATE_USER_SUCCESS, USER_FALIURE, USER_REQUEST, USER_SUCCESS } from "./UserType"

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

//CREATE A USER
export const createuserRequest = () =>{
    return{
        type: CREATE_USER_REQUEST
    }
}

export const createuserSuccess = (response) =>{
    return{
        type: CREATE_USER_SUCCESS,
        payload: response
    }
}

export const createuserFaliure = (error) =>{
    return{
        type: CREATE_USER_FALIURE,
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

//GET all users
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

//CREATE A service
export const postuser = (postdata, history, errors) => {
    return(dispatch) => {
        dispatch(createuserRequest())
        
        let datas = JSON.parse(localStorage.getItem("auth"))
        const headers = {
            "Content-Type": "application/json",
            authorization: `JWT ${datas?.token?.access}`,
        };
        axios.post(`${baseURL}/receptionists/`, postdata, { headers: headers })
            .then( response => {
                const data = response.data
                dispatch(createuserSuccess(data))
                history()
            })
            .catch(error =>{
                const errorMsg = error.response.data.message
                dispatch(createuserFaliure(errorMsg))
                errors()
            })
    }
}