import { ANTIBIOTICS_FALIURE, ANTIBIOTICS_REQUEST, ANTIBIOTICS_SUCCESS, CREATE_ANTIBIOTICS_FALIURE, CREATE_ANTIBIOTICS_REQUEST, CREATE_ANTIBIOTICS_SUCCESS, CREATE_INVESTIGATION_FALIURE, CREATE_INVESTIGATION_REQUEST, CREATE_INVESTIGATION_SUCCESS, CREATE_LABORATORY_FALIURE, CREATE_LABORATORY_REQUEST, CREATE_LABORATORY_SUCCESS, LABORATORY_FALIURE, LABORATORY_REQUEST, LABORATORY_SUCCESS, SINGLE_LABORATORY_FALIURE, SINGLE_LABORATORY_REQUEST, SINGLE_LABORATORY_SUCCESS } from "./LaboratoryType"

const initialState ={
    loading: false,
    data: [],
    error: ''
}

//GET ALL LAB REQUEST
export const laboratoryReducer = (state = initialState, action) => {
    switch(action.type){
        case LABORATORY_REQUEST:
            return{
                ... state,
                loading: true
            }
        case LABORATORY_SUCCESS:
            return{
                loading: false,
                data: action.payload,
                error: ''
            }
        case LABORATORY_FALIURE:
            return{
                loading:false,
                data: [],
                error: action.payload
            }
        default: return state
    }
}

//GET A SINGLE LAB REQUEST
export const singlelaboratoryReducer = (state = initialState, action) => {
    switch(action.type){
        case SINGLE_LABORATORY_REQUEST:
            return{
                ... state,
                loading: true
            }
        case SINGLE_LABORATORY_SUCCESS:
            return{
                loading: false,
                data: action.payload,
                error: ''
            }
        case SINGLE_LABORATORY_FALIURE:
            return{
                loading:false,
                data: [],
                error: action.payload
            }
        default: return state
    }
}

//CREATE A LAB REQUEST
export const createlaboratoryReducer = (state = initialState, action) => {
    switch(action.type){
        case CREATE_LABORATORY_REQUEST:
            return{
                ... state,
                loading: true
            }
        case CREATE_LABORATORY_SUCCESS:
            return{
                loading: false,
                data: action.payload,
                error: ''
            }
        case CREATE_LABORATORY_FALIURE:
            return{
                loading:false,
                data: [],
                error: action.payload
            }
        default: return state
    }
}

//CREATE A INVESTGATION REQUEST
export const createinvestigationReducer = (state = initialState, action) => {
    switch(action.type){
        case CREATE_INVESTIGATION_REQUEST:
            return{
                ... state,
                loading: true
            }
        case CREATE_INVESTIGATION_SUCCESS:
            return{
                loading: false,
                data: action.payload,
                error: ''
            }
        case CREATE_INVESTIGATION_FALIURE:
            return{
                loading:false,
                data: [],
                error: action.payload
            }
        default: return state
    }
}


//GET ALL ANTIBIOTICS
export const antibioticsReducer = (state = initialState, action) => {
    switch(action.type){
        case ANTIBIOTICS_REQUEST:
            return{
                ... state,
                loading: true
            }
        case ANTIBIOTICS_SUCCESS:
            return{
                loading: false,
                data: action.payload,
                error: ''
            }
        case ANTIBIOTICS_FALIURE:
            return{
                loading:false,
                data: [],
                error: action.payload
            }
        default: return state
    }
}

//CREATE A ANTIBIOTICS
export const createantibioticsReducer = (state = initialState, action) => {
    switch(action.type){
        case CREATE_ANTIBIOTICS_REQUEST:
            return{
                ... state,
                loading: true
            }
        case CREATE_ANTIBIOTICS_SUCCESS:
            return{
                loading: false,
                data: action.payload,
                error: ''
            }
        case CREATE_ANTIBIOTICS_FALIURE:
            return{
                loading:false,
                data: [],
                error: action.payload
            }
        default: return state
    }
}
