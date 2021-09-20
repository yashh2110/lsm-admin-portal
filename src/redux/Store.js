import { applyMiddleware, createStore } from "redux";
import allReducer from "./reducers/Index";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
const middleware = applyMiddleware(thunk)
const Store = createStore(allReducer,composeWithDevTools(middleware))

export default Store