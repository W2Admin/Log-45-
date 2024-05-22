import { REGISTER_USER_FAILURE, REGISTER_USER_REQUEST, REGISTER_USER_SUCCESS, TRANSFER_DATA } from "./RegisterType";

const initialState = {
    loading: false,
    data: [],
    registerData:'',
    error: "",
  };
  
  const registerReducer = (state = initialState, action) => {
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
  
  export default registerReducer;