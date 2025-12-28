import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import "./ReturnBook.css";

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

const ReturnBook: React.FC<BookProps> = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [books, setBooks] = useState<Book[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const navigate = useNavigate();

  const handleExtendDeadline = async (book: Book) => {
    try {
      const response = await axios.patch(`http://localhost:8081/book/removeBorrow/${book.id}`);
      if (response.data) {
        alert(`${book.name} returned back successfully.`);
      }
    } catch (error) {
      console.error('API Error:', error);
    }
  };

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setLoading(true);
        let apiUrl = `http://localhost:8081/book/allBorrowed/${searchQuery}`;
  
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
  }, [searchQuery]);

  return (
    <div className="bas_list">
      <div className="searchbar-formm">
        <input
          type="text"
          placeholder="Search books..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <div className="book-listt">
        {books.map((book) => (
          <div key={book.id} className="bookk">
            <div>
              <h4>{book.name}</h4>
            </div>
            <div>
              <img className="list_imgg" src={book.imageUrl} alt="#" onClick={() => navigate(`/books/${book.id}`)} />
            </div>
            <button type="submit" className="SEARCH" onClick={() => handleExtendDeadline(book)}>Return Book</button>
          </div>
        ))}
      </div>
      {loading && <p>Loading...</p>}
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default ReturnBook;
