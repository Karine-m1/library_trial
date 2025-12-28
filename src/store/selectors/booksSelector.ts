import { RootState } from "../store";


export const bookselector = (state: RootState) => state.BookReducer.books;

// export const bookByIdselector = (state: RootState, id: number) => 
// {
//     let data
//     const books = state.BookReducer.books
//     if(id ===  0) {
//         data = state.BookReducer.books
//     }else {
//         data = books.filter((book:any) => book.id ==id);
//     }
//     return data
// }
