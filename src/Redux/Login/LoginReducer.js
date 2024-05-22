// import { LOGIN_USER_FAILURE, LOGIN_USER_REQUEST, LOGIN_USER_SUCCESS } from "./LoginTypes"
// import React, { createContext, useEffect, useReducer } from 'react';
import axios from 'axios';
// import jwtDecode from 'jwt-decode'
// import JSEncrypt from 'jsencrypt';
// import consts from "../../Pages/Login/keys/const";
const AuthActionType = {
  // REGISTER_SUCCESS: "REGISTER_SUCCESS",
  // REGISTER_FAIL: "REGISTER_FAIL",
  LOGIN_START: "LOGIN_START",
  LOGOUT_SUCCESS: "LOGOUT_SUCCESS",
  LOGOUT_FAIL: "LOGOUT_FAIL",
  LOGIN_SUCCESS: "LOGIN_SUCCESS",
  LOGIN_FAIL: "LOGIN_FAIL",
};
const authState = {
    auth: false,
    dataAdded: false,
    token: {},
    error: ''
};
const getAuthState = () => {
    const auth = localStorage.getItem("auth");
    try {
      const authobj = JSON.parse(auth);
      const { token } = authobj.user;
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        return authobj;
        return authState;
    } catch (error) {
      return authState;
    }
};
const newAuth = getAuthState();
const authReducer = (state = authState, action) => {
    switch (action.type) {
        case AuthActionType.LOGIN_START:
          const loginAuthStart = {
            auth: false,
            dataAdded: true,
            error: ''
          };
          return loginAuthStart;
        case AuthActionType.LOGOUT_SUCCESS:
          localStorage.clear("auth");
          return authState;
    
        case AuthActionType.LOGIN_SUCCESS:
          const loginAuthState = {
            auth: true,
            dataAdded: false,
            token: action.payload,
            error: ''
          };
          axios.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${action.payload.token}`;
          localStorage.setItem("auth", JSON.stringify(loginAuthState));
          return loginAuthState;
        case AuthActionType.LOGIN_FAIL:
          const loginfailState = {
            auth: false,
            dataAdded: false,
            error: action.payload,
            token: {}
          }
          return loginfailState;
        default:
        return state;
      }
}
export default authReducer