import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import "./MyBooks.css";
import { API_URL } from "./api";
import { useAppContext } from "./context/appContext";


interface Book {
    id: string;
    name: string;
    imageUrl: string;
    [key: string]: any; // String index signature
  }
  //
  interface BookProps {
    setToken: React.Dispatch<React.SetStateAction<string|null>>;
  }
  
  const BookListOut: React.FC<BookProps> = ({ setToken }) => {
  
  const logOutHandler = () => {
    setToken("");
    localStorage.clear();
  }

  // 
// export function BookList() {
  const [books, setBooks] = useState<Book[]>([]);
  const { reserved, addToReserved, removeFromReserved } = useAppContext() || { reserved: [], addToReserved: () => {}, removeFromReserved: () => {} };

  const navigate = useNavigate();

  const favoritesChecker = (id: string) => {
    return Object.keys(reserved).some((bookId) => bookId === id);
  };

    const handleApiCall = async (bookId: string) => {
    try {
      const response = await fetch(`http://localhost:8081/book/reserve/${bookId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        } catch (error) {
      console.error('API Error:', error);
    }
  };

  const handleUndoReserve = async (bookId: string) => {
    try {
      const response = await fetch(`http://localhost:8081/book/removeReserve/${bookId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        } catch (error) {
      console.error('API Error:', error);
    }
  };

  useEffect(() => {
    axios.get(API_URL)
      .then(res => {
        console.log(res.data);
        setBooks(res.data);
      })
      .catch(err => console.log(err));
  }, []);

  return (
<>
      <div className="book-list">
        {books.map((book) => (
          <div key={book.id} className="book">
            <div>
              <h4>{book.name}</h4>
            </div>
            <div>
              <img src={book.imageUrl} alt="#" onClick={() => navigate(`/books/${book.id}`)} />
            </div>
           </div>
        ))}
      </div>
    </>
  );
}

export default BookListOut;
