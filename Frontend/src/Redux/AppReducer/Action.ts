import * as types from "./ActionTypes";
import axios, { AxiosResponse } from "axios";
import { AnyAction } from "redux";
import { AppDispatch } from "../store";

export const getReq =
  (url: string) =>
  (dispatch: (arg0: { type: string; payload?: any }) => void) => {
    dispatch({ type: types.GET_REQUEST });
    return axios
      .get(url)
      .then((res) => {
        dispatch({ type: types.GET_SUCCESS, payload: res.data.msg });
        if (res.data.msg.length > 0) {
          return "All data collected";
        } else {
          return "Data is empty";
        }
      })
      .catch(() => {
        dispatch({ type: types.GET_FAILURE });
      });
  };

  export const postReq = (url: string, payload?: any) => async (dispatch: AppDispatch)=> {
    try {
      dispatch({ type: types.POST_REQUEST });
      const response: AxiosResponse = await axios.post(url, payload);
      const action: AnyAction = { type: types.POST_SUCCESS, payload: response.data };
      return action;
    } catch (error) {
      const action: AnyAction = { type: types.POST_FAILURE };
      return action;
    }
  };  

export const delReq =
  (url: string) => (dispatch: (arg0: { type: string }) => void) => {
    dispatch({ type: types.DELETE_REQUEST });
    return axios
      .delete(url)
      .then(() => {
        dispatch({ type: types.DELETE_SUCCESS });
      })
      .catch(() => {
        dispatch({ type: types.DELETE_FAILURE });
      });
  };
