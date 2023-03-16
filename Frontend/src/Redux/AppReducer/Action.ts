import * as types from "./ActionTypes";
import axios, { AxiosResponse } from "axios";
import { AppDispatch } from "../store";


export const GetReq = (url: string,token:string) => async (dispatch: AppDispatch)=> {
  try {
    const headers={
      Authorization:token
    }
    dispatch({ type: types.GET_REQUEST });
    const response: AxiosResponse = await axios.get(url,{
      headers:headers
    });
    dispatch({ type: types.GET_SUCCESS, payload: response.data.data });
    return;
  } catch (error) {
    console.log(error)
    dispatch({ type: types.GET_FAILURE });
    return;
  }
}; 

  export const PostReq = (url: string, payload: object,token:string) => async (dispatch: AppDispatch)=> {
    try {
      dispatch({ type: types.POST_REQUEST });
      const headers={
        Authorization:token
      }
      let ax:AxiosResponse=await axios.post(url, payload,{
        headers:headers
      });
      dispatch({ type: types.POST_SUCCESS,payload:ax.data.data });
      return;
    } catch (error) {
      dispatch({ type: types.POST_FAILURE });
      return;
    }
  };  

  export const StatReq = (url: string,token:string,payload:object) => async (dispatch: AppDispatch)=> {
    try {
      dispatch({ type: types.EDIT_REQUEST });
      const headers={
        Authorization:token
      }
      await axios.patch(url, payload,{
        headers:headers
      });
      dispatch({ type: types.EDIT_SUCCESS });
      return;
    } catch (error) {
      dispatch({ type: types.EDIT_FAILURE });
      return;
    }
  }; 
