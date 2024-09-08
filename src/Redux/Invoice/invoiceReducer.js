import { 
    INVOICE_ADD_FALIURE, 
    INVOICE_ADD_REQUEST, 
    INVOICE_ADD_SUCCESS, 
    INVOICE_FALIURE, 
    INVOICE_REQUEST, 
    INVOICE_SERVICE_FALIURE, 
    INVOICE_SERVICE_REQUEST, 
    INVOICE_SERVICE_SUCCESS, 
    INVOICE_SINGLE_FALIURE, 
    INVOICE_SINGLE_REQUEST, 
    INVOICE_SINGLE_SUCCESS, 
    INVOICE_SUCCESS
} from "./InvoiceType"


const initialState ={
    loading: false,
    data: [],
    error: ''
}

//GET ALL PATIENT
export const invoiceReducer = (state = initialState, action) => {
    switch(action.type){
        case INVOICE_REQUEST:
            return{
                ... state,
                loading: true
            }
        case INVOICE_SUCCESS:
            return{
                loading: false,
                data: action.payload,
                error: ''
            }
        case INVOICE_FALIURE:
            return{
                loading:false,
                data: [],
                error: action.payload
            }
        default: return state
    }
}

//GET A SINGLE PATIENTS
export const singleinvoiceReducer = (state = initialState, action) => {
    switch(action.type){
        case INVOICE_SINGLE_REQUEST:
            return{
                ... state,
                loading: true
            }
        case INVOICE_SINGLE_SUCCESS:
            return{
                loading: false,
                data: action.payload,
                error: ''
            }
        case INVOICE_SINGLE_FALIURE:
            return{
                loading:false,
                data: [],
                error: action.payload
            }
        default: return state
    }
}

//CREATE A PATIENT
export const createinvoiceReducer = (state = initialState, action) => {
    switch(action.type){
        case INVOICE_ADD_REQUEST:
            return{
                ... state,
                loading: true
            }
        case INVOICE_ADD_SUCCESS:
            return{
                loading: false,
                data: action.payload,
                error: ''
            }
        case INVOICE_ADD_FALIURE:
            return{
                loading:false,
                data: [],
                error: action.payload
            }
        default: return state
    }
}

//CREATE A PATIENT
export const invoiceserviceReducer = (state = initialState, action) => {
    switch(action.type){
        case INVOICE_SERVICE_REQUEST:
            return{
                ... state,
                loading: true
            }
        case INVOICE_SERVICE_SUCCESS:
            return{
                loading: false,
                data: action.payload,
                error: ''
            }
        case INVOICE_SERVICE_FALIURE:
            return{
                loading:false,
                data: [],
                error: action.payload
            }
        default: return state
    }
}
