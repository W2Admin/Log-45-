import { CREATE_SERVICE_FALIURE, CREATE_SERVICE_REQUEST, CREATE_SERVICE_SUCCESS, SERVICE_FALIURE, SERVICE_REQUEST, SERVICE_SUCCESS, SINGLE_SERVICE_FALIURE, SINGLE_SERVICE_REQUEST, SINGLE_SERVICE_SUCCESS } from "./ServiceType"


const initialState ={
    loading: false,
    data: [],
    error: ''
}

//GET ALL service
export const serviceReducer = (state = initialState, action) => {
    switch(action.type){
        case SERVICE_REQUEST:
            return{
                ... state,
                loading: true
            }
        case SERVICE_SUCCESS:
            return{
                loading: false,
                data: action.payload,
                error: ''
            }
        case SERVICE_FALIURE:
            return{
                loading:false,
                data: [],
                error: action.payload
            }
        default: return state
    }
}

//GET A SINGLE serviceS
export const singleserviceReducer = (state = initialState, action) => {
    switch(action.type){
        case SINGLE_SERVICE_REQUEST:
            return{
                ... state,
                loading: true
            }
        case SINGLE_SERVICE_SUCCESS:
            return{
                loading: false,
                data: action.payload,
                error: ''
            }
        case SINGLE_SERVICE_FALIURE:
            return{
                loading:false,
                data: [],
                error: action.payload
            }
        default: return state
    }
}

//CREATE A service
export const createserviceReducer = (state = initialState, action) => {
    switch(action.type){
        case CREATE_SERVICE_REQUEST:
            return{
                ... state,
                loading: true
            }
        case CREATE_SERVICE_SUCCESS:
            return{
                loading: false,
                data: action.payload,
                error: ''
            }
        case CREATE_SERVICE_FALIURE:
            return{
                loading:false,
                data: [],
                error: action.payload
            }
        default: return state
    }
}

