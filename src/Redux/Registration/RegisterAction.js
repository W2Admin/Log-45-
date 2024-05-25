import axios from "axios";
import { REGISTER_USER_FAILURE, REGISTER_USER_REQUEST, REGISTER_USER_SUCCESS, TRANSFER_DATA, USER_FAILURE, USER_REQUEST, USER_SUCCESS } from "./RegisterType";

//FOR ORGANISATION REGISTRATION
export const registerRequest = () => {
  return {
    type: REGISTER_USER_REQUEST,
  };
};
export const registerSuccess = (register) => {
  return {
    type: REGISTER_USER_SUCCESS,
    payload: register,
  };
};


export const registerFaliure = (error) => {
  return {
    type: REGISTER_USER_FAILURE,
    payload: error,
  };
};
//FOR USER REGISTRATION
export const userRequest = () => {
  return {
    type: USER_REQUEST,
  };
};
export const userSuccess = (register) => {
  return {
    type: USER_SUCCESS,
    payload: register,
  };
};


export const userFaliure = (error) => {
  return {
    type: USER_FAILURE,
    payload: error,
  };
};

const baseUrl = "https://med-farm.onrender.com/api"
export const registerData = (registerState, history, setErrorHandler) => {
    return async (dispatch) => {
      dispatch(registerRequest())
      try {
        const res = await axios.post(
          `${baseUrl}/organisations/`,
          registerState
        );
        const { data } = res;
        if (res.status === 201) {
          history()
          dispatch(registerSuccess(data));
        }
      } catch (error) {
        if (error.response){
          dispatch(registerFaliure(error.response.data.detail));
        }
        setErrorHandler({ hasError: true, message: error?.response?.data?.message });
      }
    };
  };


  export const userData = (registerState, history, setErrorHandler) => {
    return async (dispatch) => {
      dispatch(userRequest())
      try {
        const res = await axios.post(
          `${baseUrl}/users/`,
          registerState
        );
        const { data } = res;
        if (res.status === 201) {
          history()
          dispatch(userSuccess(data));
        }
      } catch (error) {
        if (error.response){
          dispatch(userFaliure(error.response.data.detail));
        }
        setErrorHandler({ hasError: true, message: error?.response?.data?.message });
      }
    };
  };