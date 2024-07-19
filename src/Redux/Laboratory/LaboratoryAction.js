import axios from "axios"
import { ANTIBIOTICS_FALIURE, ANTIBIOTICS_REQUEST, ANTIBIOTICS_SUCCESS, CREATE_ANTIBIOTICS_FALIURE, CREATE_ANTIBIOTICS_REQUEST, CREATE_ANTIBIOTICS_SUCCESS, CREATE_INVESTIGATION_FALIURE, CREATE_INVESTIGATION_REQUEST, CREATE_INVESTIGATION_SUCCESS, CREATE_LABORATORY_FALIURE, CREATE_LABORATORY_REQUEST, CREATE_LABORATORY_SUCCESS, LABORATORY_FALIURE, LABORATORY_REQUEST, LABORATORY_SUCCESS, SINGLE_LABORATORY_FALIURE, SINGLE_LABORATORY_REQUEST, SINGLE_LABORATORY_SUCCESS } from "./LaboratoryType"


// GET ALL LABORATORY REQUEST
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


//GET SINGLE LABORATORY REQUEST
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

// CREATE LABORATORY REQURST
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

// CREATE INVESTIGATION REQURST
export const createinvestigationRequest = () =>{
    return{
        type: CREATE_INVESTIGATION_REQUEST
    }
}

export const createinvestigationSuccess = (response) =>{
    return{
        type: CREATE_INVESTIGATION_SUCCESS,
        payload: response
    }
}

export const createinvestigationFaliure = (error) =>{
    return{
        type: CREATE_INVESTIGATION_FALIURE,
        payload: error
    }
}


//GET ALL ANTIBIOTICS
export const antibioticsRequest = () =>{
    return{
        type: ANTIBIOTICS_REQUEST
    }
}

export const antibioticsSuccess = (response) =>{
    return{
        type: ANTIBIOTICS_SUCCESS,
        payload: response
    }
}

export const antibioticsFaliure = (error) =>{
    return{
        type: ANTIBIOTICS_FALIURE,
        payload: error
    }
}

//CREATE ANTIBIOTICS
export const createantibioticsRequest = () =>{
    return{
        type: CREATE_ANTIBIOTICS_REQUEST
    }
}

export const createantibioticsSuccess = (response) =>{
    return{
        type: CREATE_ANTIBIOTICS_SUCCESS,
        payload: response
    }
}

export const createantibioticsFaliure = (error) =>{
    return{
        type: CREATE_ANTIBIOTICS_FALIURE,
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

export const createinvestigation = (id,postdata, history, errors) => {
    return(dispatch) => {
        dispatch(createinvestigationRequest())
        let datas = JSON.parse(localStorage.getItem("auth"))
        const headers = {
            'content-type': 'multipart/form-data',
            authorization: `JWT ${datas?.token?.access}`,
        };
        // let datas = JSON.parse(localStorage.getItem("auth"))
        axios.post(`${baseUrl}/lab_requests/${id}/investigations/`, postdata, { headers: headers })
            .then( response => {
                const data = response.data
                dispatch(createinvestigationSuccess(data))
                history()
            })
            .catch(error =>{
                const errorMsg = error.message
                dispatch(createinvestigationFaliure(errorMsg))
                errors()
            })
    }
}

//GET ALL ANTIBIOTICS
export const fetchantibiotics = () => {
    return(dispatch) => {
        dispatch(antibioticsRequest())
        let datas = JSON.parse(localStorage.getItem("auth"))
        const headers = {
            "Content-Type": "application/json",
            authorization: `JWT ${datas?.token?.access}`,
        };
        // let datas = JSON.parse(localStorage.getItem("auth"))
        axios.get(`${baseUrl}/antibiotics/`, { headers: headers })
            .then( response => {
                const data = response.data
                dispatch(antibioticsSuccess(data))
            })
            .catch(error =>{
                const errorMsg = error.message
                dispatch(antibioticsFaliure(errorMsg))
            })
    }
}
//CREATE ANTIBIOTICS
export const createantibiotics = (postdata, history, errors) => {
    return(dispatch) => {
        dispatch(createantibioticsRequest())
        let datas = JSON.parse(localStorage.getItem("auth"))
        const headers = {
            'content-type': 'multipart/form-data',
            authorization: `JWT ${datas?.token?.access}`,
        };
        // let datas = JSON.parse(localStorage.getItem("auth"))
        axios.post(`${baseUrl}/antibiotics/`, postdata, { headers: headers })
            .then( response => {
                const data = response.data
                dispatch(createantibioticsSuccess(data))
                history()
            })
            .catch(error =>{
                const errorMsg = error.message
                dispatch(createantibioticsFaliure(errorMsg))
                errors()
            })
    }
}