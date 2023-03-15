import {legacy_createStore as createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { Reducer as AppReducer } from "./AppReducer/Reducer";
import { Reducer as AuthReducer } from "./AuthReducer/Reducer";
declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const rootReducer = combineReducers({ AppReducer,AuthReducer });
const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);
export type AppDispatch = typeof store.dispatch
export { store };
