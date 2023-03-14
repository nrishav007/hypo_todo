import * as types from "./ActionTypes";
import axios from "axios";

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

export const postReq =
  (url: string) =>
  (dispatch) => {
    dispatch({type: types.POST_REQUEST});
    return axios
      .post(url)
      .then((r) => {
        dispatch({ type: types.POST_SUCCESS, payload: r.data });
      })
      .catch(() => {
        dispatch({ type: types.POST_FAILURE });
      });
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
