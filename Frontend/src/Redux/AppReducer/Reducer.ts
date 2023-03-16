import * as types from "./ActionTypes";

interface InitialData {
  userData: object[];
  isLoading: boolean;
  isError: boolean;
}

const initialState: InitialData = {
  userData: [],
  isLoading: false,
  isError: false,
};

function Reducer(state = initialState, action: any) {
  const { payload, type } = action;
  switch (type) {
    case types.GET_REQUEST: {
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    }

    case types.GET_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        userData: payload,
        isError: false,
      };
    }

    case types.GET_FAILURE: {
      return {
        ...state,
        isLoading: false,
        userData: [],
        isError: true,
      };
    }

    case types.POST_REQUEST: {
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    }

    case types.POST_SUCCESS: {
      return {
        ...state,
        userData:state.userData.concat(payload),
        isLoading: false,
        isError: false,
      };
    }

    case types.POST_FAILURE: {
      return {
        ...state,
        isLoading: false,
        userData: [],
        isError: true,
      };
    }

    case types.EDIT_REQUEST: {
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    }

    case types.EDIT_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        isError: false,
      };
    }

    case types.EDIT_FAILURE: {
      return {
        ...state,
        isLoading: false,
        userData: [],
        isError: true,
      };
    }
    default:
      return state;
  }
}

export { Reducer };
