import axios from "axios";
import { OTP_USER_FAILURE, OTP_USER_REQUEST, OTP_USER_SUCCESS } from "./OtpType";

export const otpRequest = () => {
  return {
    type: OTP_USER_REQUEST,
  };
};
export const otpSuccess = (otp) => {
  return {
    type: OTP_USER_SUCCESS,
    payload: otp,
  };
};


export const otpFaliure = (error) => {
  return {
    type: OTP_USER_FAILURE,
    payload: error,
  };
};

const baseUrl = "https://fe-sandbox-quick-pay.onrender.com/api/v1"

export const otpData = (otpState, history, setErrorHandler) => {
    return async (dispatch) => {
        dispatch(otpRequest())
      try {
        const res = await axios.post(
          `${baseUrl}/auth/VerifyAuthOtp`,
          otpState
        );
        const { data } = res;
        if (res.status === 200) {
          history()
          dispatch(otpSuccess(data));
        }
      } catch (error) {
        if (error.response) {
          dispatch(otpFaliure(error));
        }
        setErrorHandler({ hasError: true, message: error?.response?.data});
      }
    };
  };