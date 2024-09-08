import axios from "axios"
import { STATISTICS_FALIURE, STATISTICS_REQUEST, STATISTICS_SUCCESS } from "./StatisticsType"

export const statisticsRequest = () =>{
    return{
        type: STATISTICS_REQUEST
    }
}

export const statisticsSuccess = (response) =>{
    return{
        type: STATISTICS_SUCCESS,
        payload: response
    }
}

export const statisticsFaliure = (error) =>{
    return{
        type: STATISTICS_FALIURE,
        payload: error
    }
}

const baseUrl = "https://med-farm.onrender.com/api"

//GET ALL PATIENTS
export const fetchstatistics = () => {
    return(dispatch) => {
        dispatch(statisticsRequest())
        let datas = JSON.parse(localStorage.getItem("auth"))
        const headers = {
            "Content-Type": "application/json",
            authorization: `JWT ${datas?.token?.access}`,
        };
        // let datas = JSON.parse(localStorage.getItem("auth"))
        axios.get(`${baseUrl}/statistics/`, { headers: headers })
            .then( response => {
                const data = response.data
                dispatch(statisticsSuccess(data))
            })
            .catch(error =>{
                const errorMsg = error.message
                dispatch(statisticsFaliure(errorMsg))
            })
    }
}