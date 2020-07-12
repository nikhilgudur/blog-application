import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE } from "./actionTypes";
import axios from "axios";

export const loginRequest = (payload) => ({
  type: LOGIN_REQUEST,
  payload,
});

export const loginSuccess = (payload) => ({
  type: LOGIN_SUCCESS,
  payload,
});

export const loginFailure = () => ({
  type: LOGIN_FAILURE,
});

export const loginUser = (payload) => (dispatch) => {
  return new Promise((resolve, reject) => {
    dispatch(loginRequest());
    return axios
      .post(`http://127.0.0.1:5000/login`, payload)
      .then((res) => {
        if (res.data.stauts === 200) {
          dispatch(loginSuccess(res.data));
          resolve(res);
        } else {
          dispatch(loginFailure());
        }
      })
      .catch((err) => {
        dispatch(loginFailure());
        reject(err);
      });
  });
};
