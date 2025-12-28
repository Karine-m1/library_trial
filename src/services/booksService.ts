import axios from 'axios'; //Axios is a popular JavaScript library for making HTTP requests. 

//URL for the API endpoint you want to fetch data from.
const url = "https://jsonplaceholder.typicode.com/users";

const getBook = async () => {
  try {
    //the await keyword is used to wait for the promise returned by axios.get to resolve.
    // If the request is successful, the response data is returned (return response.data).
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

const getBookById = async (id: number) => {
  try {
    const response = await axios.get(`${url}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching data for ID ${id}:", error);
    throw error;
  }
};

const BookService = {
  getBook,
  getBookById,
}




export default BookService



