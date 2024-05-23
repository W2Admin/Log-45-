import { OTP_USER_FAILURE, OTP_USER_REQUEST, OTP_USER_SUCCESS } from "./OtpType";

const initialState = {
    loading: false,
    data: [],
    error: "",
  };
  
  const otpReducer = (state = initialState, action) => {
    switch (action.type) {
      case OTP_USER_REQUEST:
        return {
          loading: true,
          requestData: {},
          data: [],
          error: "",
        };
    
      case OTP_USER_SUCCESS:
        return {
          loading: false,
          data: action.payload,
          error: "",
        };
      case OTP_USER_FAILURE:
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
  
  export default otpReducer;