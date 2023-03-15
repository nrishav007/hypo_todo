import * as types from "./ActionTypes";

interface InitialData {
  name: object;
  token:string;
  isLoading: boolean;
  isError: boolean;
}

const initialState: InitialData = {
  name: {},
  token:"",
  isLoading: false,
  isError: false,
};

function Reducer(state = initialState, action: any) {
  const { payload, type } = action;
  switch (type) {
    case types.LOGIN_REQUEST: {
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    }

    case types.LOGIN_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        name: payload.username,
        token:payload.token,
        isError: false,
      };
    }

    case types.LOGIN_FAILURE: {
      return {
        ...state,
        isLoading: false,
        name: {},
        isError: true,
      };
    }

    case types.SIGNUP_REQUEST: {
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    }

    case types.SIGNUP_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        isError: false,
      };
    }

    case types.SIGNUP_FAILURE: {
      return {
        ...state,
        isLoading: false,
        name: {},
        isError: true,
      };
    }

    case types.LOGOUT_REQUEST: {
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    }

    case types.LOGOUT_SUCCESS: {
      return {
        ...state,
        name: {},
        token:"",
        isLoading: false,
        isError: false
      };
    }

    case types.LOGOUT_FAILURE: {
      return {
        ...state,
        isLoading: false,
        name: {},
        token:"",
        isError: true,
      };
    }

    default:
      return state;
  }
}

export { Reducer };
