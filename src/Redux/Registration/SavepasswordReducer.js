import { PASSWORD_USER_FAILURE, PASSWORD_USER_REQUEST, PASSWORD_USER_SUCCESS } from "./SavepasswordType";

const initialState = {
    loading: false,
    data: [],
    error: "",
  };
  
  const passwordReducer = (state = initialState, action) => {
    switch (action.type) {
      case PASSWORD_USER_REQUEST:
        return {
          loading: true,
          requestData: {},
          data: [],
          error: "",
        };
    
      case PASSWORD_USER_SUCCESS:
        return {
          loading: false,
          data: action.payload,
          error: "",
        };
      case PASSWORD_USER_FAILURE:
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
  
  export default passwordReducer;