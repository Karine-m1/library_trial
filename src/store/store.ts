
import thunk from "redux-thunk";
import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from './reducer' 



const initialState = {};

const middleware = [thunk];

const store = createStore(
    rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
export type RootState = ReturnType<typeof rootReducer>;
