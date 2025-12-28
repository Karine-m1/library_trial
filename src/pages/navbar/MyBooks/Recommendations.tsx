import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import "./MyBooks.css";
import { useAuth } from "./context/authContext";

interface Book {
  id: string;
  name: string;
  author: string;
  genre: string;
  imageUrl: string;
  [key: string]: any;
}

interface BookProps {
  setToken: React.Dispatch<React.SetStateAction<string | null>>;
}

const Recommendations: React.FC<BookProps> = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filterBy, setFilterBy] = useState<string>('all'); // Default filter criteria
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { userId, isLoggedIn } = useAuth();

  const navigate = useNavigate();

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setLoading(true);
        let apiUrl;

          apiUrl = `http://localhost:8081/api/recommendations/${userId}`;

        const response = await axios.get(apiUrl);
        setBooks(response.data);
        setError(null);
      } catch (error) {
        console.error('API Error:', error);
        setError('Error fetching books. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, [searchQuery, filterBy]);

  return (
    <div className="base_list">
      <div className="searchbar-form">
        </div>
      {loading && <p>Loading...</p>}
      {error && <p className="error-message">{error}</p>}
      <div className="book-list">
        {books.map((book) => (
          <div key={book.id} className="bookR">
            <div>
              <h4>{book.name}</h4>
            </div>
            <div>
              <img className="list_img" src={book.imageUrl} alt="#" onClick={() => navigate(`/books/${book.id}`)} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Recommendations;