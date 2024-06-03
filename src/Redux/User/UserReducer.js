import { USER_FALIURE, USER_REQUEST, USER_SUCCESS } from "./UserType"

const initialState ={
    loading: false,
    data: [],
    error: ''
}

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
