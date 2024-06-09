import { ALL_USER_FALIURE, ALL_USER_REQUEST, ALL_USER_SUCCESS, CREATE_USER_FALIURE, CREATE_USER_REQUEST, CREATE_USER_SUCCESS, USER_FALIURE, USER_REQUEST, USER_SUCCESS } from "./UserType"

const initialState ={
    loading: false,
    data: [],
    error: ''
}
//GET CURRENT LOGIN USER
export const profileReducer = (state = initialState, action) => {
    switch(action.type){
        case USER_REQUEST:
            return{
                ... state,
                loading: true
            }
        case USER_SUCCESS:
            return{
                loading: false,
                data: action.payload,
                error: ''
            }
        case USER_FALIURE:
            return{
                loading:false,
                data: [],
                error: action.payload
            }
        default: return state
    }
}


//GET ALL USER
export const usersReducer = (state = initialState, action) => {
    switch(action.type){
        case ALL_USER_REQUEST:
            return{
                ... state,
                loading: true
            }
        case ALL_USER_SUCCESS:
            return{
                loading: false,
                data: action.payload,
                error: ''
            }
        case ALL_USER_FALIURE:
            return{
                loading:false,
                data: [],
                error: action.payload
            }
        default: return state
    }
}

//CREATE A NEW USER
export const createusersReducer = (state = initialState, action) => {
    switch(action.type){
        case CREATE_USER_REQUEST:
            return{
                ... state,
                loading: true
            }
        case CREATE_USER_SUCCESS:
            return{
                loading: false,
                data: action.payload,
                error: ''
            }
        case CREATE_USER_FALIURE:
            return{
                loading:false,
                data: [],
                error: action.payload
            }
        default: return state
    }
}