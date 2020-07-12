import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import userAuth from "./authentication/reducer";

const rootReducer = combineReducers({
  userAuth,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
