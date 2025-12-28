import { AnyAction, combineReducers } from 'redux';


import BookReducer from './booksReducer';


const appReducer = combineReducers({
  BookReducer
});

const rootReducer = (state: any, action: AnyAction) => {
  if (action.type === 'LOGOUT') {
    return appReducer(undefined, action);
  }

  return appReducer(state, action);
};

export default rootReducer;
