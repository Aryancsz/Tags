import { createStore, combineReducers } from "redux";
import textReducers from "./reducers/textReducers";

const root = combineReducers({
  textReducers,
});
const store = createStore(
  root,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
export default store;
