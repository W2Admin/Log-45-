import axios from "axios"
import { INVOICE_ADD_FALIURE, INVOICE_ADD_REQUEST, INVOICE_ADD_SUCCESS, INVOICE_FALIURE, INVOICE_REQUEST, INVOICE_SERVICE_FALIURE, INVOICE_SERVICE_REQUEST, INVOICE_SERVICE_SUCCESS, INVOICE_SUCCESS } from "./InvoiceType"

//CREATE INVOICE
export const createinvoiceRequest = () =>{
    return{
        type: INVOICE_ADD_REQUEST
    }
}

export const createinvoiceSuccess = (response) =>{
    return{
        type: INVOICE_ADD_SUCCESS,
        payload: response
    }
}

export const createinvoiceFaliure = (error) =>{
    return{
        type: INVOICE_ADD_FALIURE,
        payload: error
    }
}

export const invoiceserviceRequest = () =>{
    return{
        type: INVOICE_SERVICE_REQUEST
    }
}

export const invoiceserviceSuccess = (response) =>{
    return{
        type: INVOICE_SERVICE_SUCCESS,
        payload: response
    }
}

export const invoiceserviceFaliure = (error) =>{
    return{
        type: INVOICE_SERVICE_FALIURE,
        payload: error
    }
}

// GET ALL INVOICES
export const invoiceRequest = () =>{
    return{
        type: INVOICE_REQUEST
    }
}

export const invoiceSuccess = (response) =>{
    return{
        type: INVOICE_SUCCESS,
        payload: response
    }
}

export const invoiceFaliure = (error) =>{
    return{
        type: INVOICE_FALIURE,
        payload: error
    }
}


const baseUrl = "https://med-farm.onrender.com/api"
export const Createinvoice = (postdata, history, errors) => {
    return(dispatch) => {
        dispatch(createinvoiceRequest())
        let datas = JSON.parse(localStorage.getItem("auth"))
        const headers = {
            authorization: `JWT ${datas?.token?.access}`,
        };
        // let datas = JSON.parse(localStorage.getItem("auth"))
        axios.post(`${baseUrl}/invoices/`, postdata, { headers: headers })
            .then( response => {
                const data = response.data
                dispatch(createinvoiceSuccess(data))
                history()
            })
            .catch(error =>{
                const errorMsg = error.message
                dispatch(createinvoiceFaliure(errorMsg))
                errors()
            })
    }
}

export const InvoiceService = (postdata, history, errors) => {
    return(dispatch) => {
        dispatch(invoiceserviceRequest())
        let datas = JSON.parse(localStorage.getItem("auth"))
        const headers = {
            authorization: `JWT ${datas?.token?.access}`,
        };
        // let datas = JSON.parse(localStorage.getItem("auth"))
        axios.post(`${baseUrl}/invoice-services/`, postdata, { headers: headers })
            .then( response => {
                const data = response.data
                dispatch(invoiceserviceSuccess(data))
                history()
            })
            .catch(error =>{
                const errorMsg = error.message
                dispatch(invoiceserviceFaliure(errorMsg))
                errors()
            })
    }
}

export const fetchinvoice = () => {
    return(dispatch) => {
        dispatch(invoiceRequest())
        let datas = JSON.parse(localStorage.getItem("auth"))
        const headers = {
            "Content-Type": "application/json",
            authorization: `JWT ${datas?.token?.access}`,
        };
        // let datas = JSON.parse(localStorage.getItem("auth"))
        axios.get(`${baseUrl}/invoices/`, { headers: headers })
            .then( response => {
                const data = response.data
                dispatch(invoiceSuccess(data))
            })
            .catch(error =>{
                const errorMsg = error.message
                dispatch(invoiceFaliure(errorMsg))
            })
    }
}
