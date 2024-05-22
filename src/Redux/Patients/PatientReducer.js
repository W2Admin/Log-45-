import { CREATE_PATIENT_FALIURE, CREATE_PATIENT_REQUEST, CREATE_PATIENT_SUCCESS, PATIENT_FALIURE, PATIENT_REQUEST, PATIENT_SUCCESS, SINGLE_PATIENT_FALIURE, SINGLE_PATIENT_REQUEST, SINGLE_PATIENT_SUCCESS } from "./PatientType"


const initialState ={
    loading: false,
    data: [],
    error: ''
}

//GET ALL PATIENT
export const patientReducer = (state = initialState, action) => {
    switch(action.type){
        case PATIENT_REQUEST:
            return{
                ... state,
                loading: true
            }
        case PATIENT_SUCCESS:
            return{
                loading: false,
                data: action.payload,
                error: ''
            }
        case PATIENT_FALIURE:
            return{
                loading:false,
                data: [],
                error: action.payload
            }
        default: return state
    }
}

//GET A SINGLE PATIENTS
export const singlepatientReducer = (state = initialState, action) => {
    switch(action.type){
        case SINGLE_PATIENT_REQUEST:
            return{
                ... state,
                loading: true
            }
        case SINGLE_PATIENT_SUCCESS:
            return{
                loading: false,
                data: action.payload,
                error: ''
            }
        case SINGLE_PATIENT_FALIURE:
            return{
                loading:false,
                data: [],
                error: action.payload
            }
        default: return state
    }
}

//CREATE A PATIENT
export const createpatientReducer = (state = initialState, action) => {
    switch(action.type){
        case CREATE_PATIENT_REQUEST:
            return{
                ... state,
                loading: true
            }
        case CREATE_PATIENT_SUCCESS:
            return{
                loading: false,
                data: action.payload,
                error: ''
            }
        case CREATE_PATIENT_FALIURE:
            return{
                loading:false,
                data: [],
                error: action.payload
            }
        default: return state
    }
}

