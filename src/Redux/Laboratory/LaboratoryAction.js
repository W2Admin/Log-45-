import axios from "axios"
import { CREATE_LABORATORY_FALIURE, CREATE_LABORATORY_REQUEST, CREATE_LABORATORY_SUCCESS, LABORATORY_FALIURE, LABORATORY_REQUEST, LABORATORY_SUCCESS, SINGLE_LABORATORY_FALIURE, SINGLE_LABORATORY_REQUEST, SINGLE_LABORATORY_SUCCESS } from "./LaboratoryType"

export const laboratoryRequest = () =>{
    return{
        type: LABORATORY_REQUEST
    }
}

export const laboratorySuccess = (response) =>{
    return{
        type: LABORATORY_SUCCESS,
        payload: response
    }
}

export const laboratoryFaliure = (error) =>{
    return{
        type: LABORATORY_FALIURE,
        payload: error
    }
}

export const singlelaboratoryRequest = () =>{
    return{
        type: SINGLE_LABORATORY_REQUEST
    }
}

export const singlelaboratorySuccess = (response) =>{
    return{
        type: SINGLE_LABORATORY_SUCCESS,
        payload: response
    }
}

export const singlelaboratoryFaliure = (error) =>{
    return{
        type:  SINGLE_LABORATORY_FALIURE,
        payload: error
    }
}


export const createlaboratoryRequest = () =>{
    return{
        type: CREATE_LABORATORY_REQUEST
    }
}

export const createlaboratorySuccess = (response) =>{
    return{
        type: CREATE_LABORATORY_SUCCESS,
        payload: response
    }
}

export const createlaboratoryFaliure = (error) =>{
    return{
        type: CREATE_LABORATORY_FALIURE,
        payload: error
    }
}

const baseUrl = "https://med-farm.onrender.com/api"

//GET ALL PATIENTS
export const fetchlabortory = (id) => {
    return(dispatch) => {
        dispatch(laboratoryRequest())
        let datas = JSON.parse(localStorage.getItem("auth"))
        const headers = {
            "Content-Type": "application/json",
            authorization: `JWT ${datas?.token?.access}`,
        };
        // let datas = JSON.parse(localStorage.getItem("auth"))
        axios.get(`${baseUrl}/lab_requests/${id}/`, { headers: headers })
            .then( response => {
                const data = response.data
                dispatch(laboratorySuccess(data))
            })
            .catch(error =>{
                const errorMsg = error.message
                dispatch(laboratoryFaliure(errorMsg))
            })
    }
}
export const fetchsinglelabortory = (orgid, id) => {
    return(dispatch) => {
        dispatch(singlelaboratoryRequest())
        let datas = JSON.parse(localStorage.getItem("auth"))
        const headers = {
            "Content-Type": "application/json",
            authorization: `JWT ${datas?.token?.access}`,
        };
        // let datas = JSON.parse(localStorage.getItem("auth"))
        axios.get(`${baseUrl}/lab_requests/${orgid}/${id}/`, { headers: headers })
            .then( response => {
                const data = response.data
                dispatch(singlelaboratorySuccess(data))
            })
            .catch(error =>{
                const errorMsg = error.message
                dispatch(singlelaboratoryFaliure(errorMsg))
            })
    }
}

export const createlabortory = (id,postdata, history, errors) => {
    return(dispatch) => {
        dispatch(createlaboratoryRequest())
        let datas = JSON.parse(localStorage.getItem("auth"))
        const headers = {
            'content-type': 'multipart/form-data',
            authorization: `JWT ${datas?.token?.access}`,
        };
        // let datas = JSON.parse(localStorage.getItem("auth"))
        axios.post(`${baseUrl}/lab_requests/${id}/`, postdata, { headers: headers })
            .then( response => {
                const data = response.data
                dispatch(createlaboratorySuccess(data))
                history()
            })
            .catch(error =>{
                const errorMsg = error.message
                dispatch(createlaboratoryFaliure(errorMsg))
                errors()
            })
    }
}