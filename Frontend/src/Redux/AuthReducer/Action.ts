import * as types from "./ActionTypes";
import axios, { AxiosResponse } from "axios";
import { AppDispatch } from "../store";

export const signup =
  (url: string, payload?: object) => async (dispatch: AppDispatch) => {
    try {
      dispatch({ type: types.SIGNUP_REQUEST });
      await axios.post(url, payload);
      dispatch({ type: types.SIGNUP_SUCCESS });
      return;
    } catch (error) {
      dispatch({ type: types.SIGNUP_FAILURE });
      return;
    }
  };

export const login =
  (url: string, payload?: object) => async (dispatch: AppDispatch) => {
    try {
      dispatch({ type: types.LOGIN_REQUEST });
      const response: AxiosResponse = await axios.post(url, payload);
      dispatch({
        type: types.LOGIN_SUCCESS,
        payload: {
          username: response.data.displayName,
          token: response.data.token,
        },
      });
      return;
    } catch (error) {
      dispatch({ type: types.LOGIN_FAILURE });
      return;
    }
  };

  export const logout =
  () => async (dispatch: AppDispatch) => {
    try {
      dispatch({ type: types.LOGOUT_REQUEST });
        dispatch({ type: types.LOGOUT_SUCCESS });
        return;
    } catch (error) {
      dispatch({ type: types.LOGOUT_FAILURE }); 
      return;
    }
  };
