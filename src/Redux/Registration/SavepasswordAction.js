import axios from "axios";
import { PASSWORD_USER_FAILURE, PASSWORD_USER_REQUEST, PASSWORD_USER_SUCCESS } from "./SavepasswordType";

export const passwordRequest = () => {
  return {
    type: PASSWORD_USER_REQUEST,
  };
};
export const passwordSuccess = (register) => {
  return {
    type: PASSWORD_USER_SUCCESS,
    payload: register,
  };
};


export const passwordFaliure = (error) => {
  return {
    type: PASSWORD_USER_FAILURE,
    payload: error,
  };
};
const baseUrl = "https://fe-sandbox-quick-pay.onrender.com/api/v1"
export const passwordData = (passwordState, history, setErrorHandler) => {
    return async (dispatch) => {
        dispatch(passwordRequest())
      try {
        const headers = {
          "Content-Type": "application/json",
        };
        const res = await axios.post(
          `${baseUrl}/auth/savePassword`,
          passwordState
        );
        const { data } = res;
        if (res.status === 200) {
          history()
          dispatch(passwordSuccess(data));
        }
      } catch (error) {
        if (error.response) {
          dispatch(passwordFaliure(error));
        }
        setErrorHandler({ hasError: true, message: error?.response});
      }
    };
  };