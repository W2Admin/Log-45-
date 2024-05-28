import { CREATE_LABORATORY_FALIURE, CREATE_LABORATORY_REQUEST, CREATE_LABORATORY_SUCCESS, LABORATORY_FALIURE, LABORATORY_REQUEST, LABORATORY_SUCCESS } from "./LaboratoryType"

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


