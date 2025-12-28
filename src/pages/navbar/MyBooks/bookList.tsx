import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import "./MyBooks.css";

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

const BookList: React.FC<BookProps> = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filterBy, setFilterBy] = useState<string>('all'); // Default filter criteria
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setLoading(true);
        let apiUrl;

        if (filterBy === 'all') {
          apiUrl = "http://localhost:8081/bookget";
        } else {
          switch (filterBy) {
            case 'name':
              apiUrl = `http://localhost:8081/book/searchByName?name=${searchQuery}`;
              break;
            case 'author':
              apiUrl = `http://localhost:8081/book/author?author=${searchQuery}`;
              break;
            case 'genre':
              apiUrl = `http://localhost:8081/book/searchByGenre?genre=${searchQuery}`;
              break;
            default:
              throw new Error('Invalid filter criteria');
          }
        }

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

  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterBy(event.target.value);
  };

  return (
    <div className="base_list">
      <div className="searchbar-form">
        <input
          type="text"
          placeholder="Search books..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <span className="glyphicon glyphicon-search"></span>
        <select className="SELECT_SEARCH" value={filterBy} onChange={handleFilterChange}>
          <option value="all">All</option>
          <option value="name">Name</option>
          <option value="author">Author</option>
          <option value="genre">Genre</option>
        </select>
        <div>
        <button type="submit" className="SEARCHH">
          <img src="https://cdn-icons-png.flaticon.com/128/4674/4674736.png" alt="SEARCH Icon" className="SEARCHHIMG"/>
        </button>
        </div>
        </div>
      {loading && <p>Loading...</p>}
      {error && <p className="error-message">{error}</p>}
      <div className="book-list">
        {books.map((book) => (
          <div key={book.id} className="bookl">
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

export default BookList;