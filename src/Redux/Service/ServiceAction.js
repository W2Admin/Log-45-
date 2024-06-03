
import axios from "axios"
import { CREATE_SERVICE_FALIURE, CREATE_SERVICE_REQUEST, CREATE_SERVICE_SUCCESS, SERVICE_FALIURE, SERVICE_REQUEST, SERVICE_SUCCESS, SINGLE_SERVICE_FALIURE, SINGLE_SERVICE_REQUEST, SINGLE_SERVICE_SUCCESS } from "./ServiceType"

// GET ALL service
export const serviceRequest = () =>{
    return{
        type: SERVICE_REQUEST
    }
}

export const serviceSuccess = (response) =>{
    return{
        type: SERVICE_SUCCESS,
        payload: response
    }
}

export const serviceFaliure = (error) =>{
    return{
        type: SERVICE_FALIURE,
        payload: error
    }
}

//GET A SINGLE service
export const singleserviceRequest = () =>{
    return{
        type: SINGLE_SERVICE_REQUEST
    }
}

export const singleserviceSuccess = (response) =>{
    return{
        type: SINGLE_SERVICE_SUCCESS,
        payload: response
    }
}

export const singleserviceFaliure = (error) =>{
    return{
        type: SINGLE_SERVICE_FALIURE,
        payload: error
    }
}


// CREATE A serviceS
export const createserviceRequest = () =>{
    return{
        type: CREATE_SERVICE_REQUEST
    }
}

export const createserviceSuccess = (response) =>{
    return{
        type: CREATE_SERVICE_SUCCESS,
        payload: response
    }
}

export const createserviceFaliure = (error) =>{
    return{
        type: CREATE_SERVICE_FALIURE,
        payload: error
    }
}

const baseUrl = "https://med-farm.onrender.com/api"

//GET ALL serviceS
export const fetchservice = (id) => {
    return(dispatch) => {
        dispatch(serviceRequest())
        let datas = JSON.parse(localStorage.getItem("auth"))
        const headers = {
            "Content-Type": "application/json",
            authorization: `JWT ${datas?.token?.access}`,
        };
        // let datas = JSON.parse(localStorage.getItem("auth"))
        axios.get(`${baseUrl}/services/${id}/`, { headers: headers })
            .then( response => {
                const data = response.data
                dispatch(serviceSuccess(data))
            })
            .catch(error =>{
                const errorMsg = error.message
                dispatch(serviceFaliure(errorMsg))
            })
    }
}

//GET A SINGLE serviceS
export const singlefetchservice = (id) => {
    return(dispatch) => {
        dispatch(singleserviceRequest())
        let datas = JSON.parse(localStorage.getItem("auth"))
        const headers = {
            "Content-Type": "application/json",
            authorization: `JWT ${datas?.token?.access}`,
        };
        axios.get(`${baseUrl}/customers/${id}/`, { headers: headers })
            .then( response => {
                const data = response.data
                dispatch(singleserviceSuccess(data))
            })
            .catch(error =>{
                const errorMsg = error.message
                dispatch(singleserviceFaliure(errorMsg))
            })
    }
}


//CREATE A service
export const postservice = (id,postdata, history, errors) => {
    return(dispatch) => {
        dispatch(createserviceRequest())
        
        let datas = JSON.parse(localStorage.getItem("auth"))
        const headers = {
            "Content-Type": "application/json",
            authorization: `JWT ${datas?.token?.access}`,
        };
        axios.post(`${baseUrl}/services/${id}/`, postdata, { headers: headers })
            .then( response => {
                const data = response.data
                dispatch(createserviceSuccess(data))
                history()
            })
            .catch(error =>{
                const errorMsg = error.response.data.message
                dispatch(createserviceFaliure(errorMsg))
                errors()
            })
    }
}