import { STATISTICS_FALIURE, STATISTICS_REQUEST, STATISTICS_SUCCESS } from "./StatisticsType"

const initialState ={
    loading: false,
    data: [],
    error: ''
}

//GET ALL PATIENT
export const statisticsReducer = (state = initialState, action) => {
    switch(action.type){
        case STATISTICS_REQUEST:
            return{
                ... state,
                loading: true
            }
        case STATISTICS_SUCCESS:
            return{
                loading: false,
                data: action.payload,
                error: ''
            }
        case STATISTICS_FALIURE:
            return{
                loading:false,
                data: [],
                error: action.payload
            }
        default: return state
    }
}
