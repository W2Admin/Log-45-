
import axios from "axios"
import { CREATE_PATIENT_FALIURE, CREATE_PATIENT_REQUEST, CREATE_PATIENT_SUCCESS, PATIENT_FALIURE, PATIENT_REQUEST, PATIENT_SUCCESS, SINGLE_PATIENT_FALIURE, SINGLE_PATIENT_REQUEST, SINGLE_PATIENT_SUCCESS } from "./PatientType"


// GET ALL PATIENT
export const patientRequest = () =>{
    return{
        type: PATIENT_REQUEST
    }
}

export const patientSuccess = (response) =>{
    return{
        type: PATIENT_SUCCESS,
        payload: response
    }
}

export const patientFaliure = (error) =>{
    return{
        type: PATIENT_FALIURE,
        payload: error
    }
}

//GET A SINGLE PATIENT
export const singlepatientRequest = () =>{
    return{
        type: SINGLE_PATIENT_REQUEST
    }
}

export const singlepatientSuccess = (response) =>{
    return{
        type: SINGLE_PATIENT_SUCCESS,
        payload: response
    }
}

export const singlepatientFaliure = (error) =>{
    return{
        type: SINGLE_PATIENT_FALIURE,
        payload: error
    }
}


// CREATE A PATIENTS
export const createpatientRequest = () =>{
    return{
        type: CREATE_PATIENT_REQUEST
    }
}

export const createpatientSuccess = (response) =>{
    return{
        type: CREATE_PATIENT_SUCCESS,
        payload: response
    }
}

export const createpatientFaliure = (error) =>{
    return{
        type: CREATE_PATIENT_FALIURE,
        payload: error
    }
}

const baseUrl = "https://med-farm.onrender.com/api"

//GET ALL PATIENTS
export const fetchpatient = () => {
    return(dispatch) => {
        dispatch(patientRequest())
        let datas = JSON.parse(localStorage.getItem("auth"))
        const headers = {
            "Content-Type": "application/json",
            authorization: `JWT ${datas?.token?.access}`,
        };
        // let datas = JSON.parse(localStorage.getItem("auth"))
        axios.get(`${baseUrl}/patients/`, { headers: headers })
            .then( response => {
                const data = response.data
                dispatch(patientSuccess(data))
            })
            .catch(error =>{
                const errorMsg = error.message
                dispatch(patientFaliure(errorMsg))
            })
    }
}

//GET A SINGLE PATIENTS
export const singlefetchpatient = (id) => {
    return(dispatch) => {
        dispatch(singlepatientRequest())
        let datas = JSON.parse(localStorage.getItem("auth"))
        const headers = {
            "Content-Type": "application/json",
            authorization: `JWT ${datas?.token?.access}`,
        };
        axios.get(`${baseUrl}/patients/${id}`, { headers: headers })
            .then( response => {
                const data = response.data
                dispatch(singlepatientSuccess(data))
            })
            .catch(error =>{
                const errorMsg = error.message
                dispatch(singlepatientFaliure(errorMsg))
            })
    }
}


//CREATE A PATIENT
export const postpatient = (postdata, history, errors) => {
    return(dispatch) => {
        dispatch(createpatientRequest())
        
        let datas = JSON.parse(localStorage.getItem("auth"))
        const headers = {
            "Content-Type": "application/json",
            authorization: `JWT ${datas?.token?.access}`,
        };
        axios.post(`${baseUrl}/patients/`, postdata, { headers: headers })
            .then( response => {
                const data = response.data
                dispatch(createpatientSuccess(data))
                history()
            })
            .catch(error =>{
                const errorMsg = error.response.data.message
                dispatch(createpatientFaliure(errorMsg))
                errors()
            })
    }
}