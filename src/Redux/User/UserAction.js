import axios from "axios"
import { USER_FALIURE, USER_REQUEST, USER_SUCCESS } from "./UserType"

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

const baseUrl = "https://med-farm.onrender.com/api"

//GET ALL PATIENTS
export const fetchuser = () => {
    return(dispatch) => {
        dispatch(userRequest())
        let datas = JSON.parse(localStorage.getItem("auth"))
        const headers = {
            "Content-Type": "application/json",
            authorization: `JWT ${datas?.token?.access}`,
        };
        // let datas = JSON.parse(localStorage.getItem("auth"))
        axios.get(`${baseUrl}/users/me/`, { headers: headers })
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