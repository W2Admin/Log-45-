import { REGISTER_USER_FAILURE, REGISTER_USER_REQUEST, REGISTER_USER_SUCCESS, TRANSFER_DATA, USER_FAILURE, USER_REQUEST, USER_SUCCESS } from "./RegisterType";

const initialState = {
    loading: false,
    data: [],
    registerData:'',
    error: "",
  };
  

  //FOR ORGANISATION REGISTRATION
  export const registerReducer = (state = initialState, action) => {
    switch (action.type) {
      case REGISTER_USER_REQUEST:
        return {
          loading: true,
          requestData: {},
          data: [],
          error: "",
        };
      case REGISTER_USER_SUCCESS:
        return {
          loading: false,
          data: action.payload,
          registerData:'',
          error: "",
        };
      case TRANSFER_DATA:
        return {
          ...state,
          registerData: action.payload,
        };
      case REGISTER_USER_FAILURE:
        return {
          loading: false,
          requestData: {},
          data: [],
          error: action.payload,
        };
      default:
        return state;
    }
  };


  //FOR USER REGISTRATION
 export const userReducer = (state = initialState, action) => {
    switch (action.type) {
      case USER_REQUEST:
        return {
          loading: true,
          data: [],
          error: "",
        };
      case USER_SUCCESS:
        return {
          loading: false,
          data: action.payload,
          error: "",
        };
      case USER_FAILURE:
        return {
          loading: false,
          data: [],
          error: action.payload,
        };
      default:
        return state;
    }
  };
