import { combineReducers } from "redux";
import travelReducer from "./Reducers/travelReducer"
import userReducer from "./Reducers/userReducer"
import { applyMiddleware, createStore } from "redux"
import thunk from 'redux-thunk'; 

const rootReducer = combineReducers({
    userReducer,
    travelReducer
  })
  
  const store = createStore(rootReducer, applyMiddleware(thunk))
  export {store}
