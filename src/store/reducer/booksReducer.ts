import { GET_ALL_BOOKS_SUCCESS, GET_BOOK_BY_ID_SUCCESS } from "../actions/booksAction";
import { AnyAction } from 'redux';

type BookReducerState = {

    books: any[];
    error: null | string;
  };
  
  const initialState: BookReducerState = {
    
    books: [],
    error: null,
  };
    //The BookReducer function is a reducer, 
    //a pure function that takes the current state and an action as parameters and returns the next state.
    const BookReducer = (state = initialState, action: AnyAction): BookReducerState => {
      switch (action.type) {
        case GET_ALL_BOOKS_SUCCESS:
          return {
            ...state,
            books: action.payload,
            error: null,
          };

          case GET_BOOK_BY_ID_SUCCESS:
            return {
              ...state,
              books: [action.payload],
              error: null,
            };
              default:
              return state;
            }
//checks the type property of the action. 
// the type matches GET_ALL_BOOKS_SUCCESS, it returns a new state object. This new state object is a copy of the current state (...state), 
//with the books property updated to the payload of the action (action.payload) and the error property set to null.
// If the type does not match any of the cases, it returns the current state unchanged.
    }
    
  export default BookReducer;