import  BookService from '../../services/booksService'; 
import { getAllBooksSuccess, getBookByIdSuccess } from '../actions/booksAction';
import { Dispatch } from 'redux';
import { AnyAction } from 'redux';

export const getAllBooksRequest = () => async (dispatch: Dispatch<AnyAction>) => {
  try {
    const response = await BookService.getBook();
    if (response.length > 0) {
      dispatch(getAllBooksSuccess(response));
    }
  } catch (error) {
    console.error("Error fetching all books:", error);
  }
};

export const getPostByIdRequest = (id: number) => async (dispatch: Dispatch<AnyAction>) => {
  try {
    const response = await BookService.getBookById(id);
    if (response !== undefined) {
      dispatch(getBookByIdSuccess(response));
    }
  } catch (error) {
    console.error(`Error fetching book by ID ${id}:`, error);
  }
};
