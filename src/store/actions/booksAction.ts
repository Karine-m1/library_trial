//when you dispatch an action using getAllBooksSuccess, it informs the Redux store that a successful operation of getting all books has occurred, and the associated data (in this case, the Books) should be stored in the Redux store. 
//Reducers in the application can then listen for this action type and update the state accordingly.

export const GET_ALL_BOOKS_SUCCESS = 'GET_ALL_BOOKS_SUCCESS'; //This constant is used as an identifier for the type of action that will be dispatched when the operation of getting all books is successful.
export const getAllBooksSuccess = (Books: any) => ({
    type: GET_ALL_BOOKS_SUCCESS,      // indicates the type of action being performed, in this case, a successful operation of getting all books.
    payload: Books //The payload property typically carries the data associated with the action. 
});

export const GET_BOOK_BY_ID_SUCCESS = 'GET_BOOK_BY_ID_SUCCESS';
export const getBookByIdSuccess = (book: any) => ({
    type: GET_BOOK_BY_ID_SUCCESS,
    payload: book
});