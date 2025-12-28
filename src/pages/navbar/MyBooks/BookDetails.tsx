import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./MyBooks.css";
import { BOOK_DETAILS_URL } from "./api";
import { useAppContext } from "./context/appContext";
import { useAuth } from "./context/authContext";

interface Book {
  id: string;
  name: string;
  imageUrl: string;
  description: string;
  author: string;
  isBorrowed: boolean;
  isReserved: boolean;
  location: string;
  user: string;
  reservedBy?: string;
}

export function BookDetails() {
  const [book, setBook] = useState<Book | null>(null);
  const { id } = useParams<{ id: string }>();
  const { isLoggedIn, userId } = useAuth();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const { reserved, requested, addToReserved, removeFromReserved, addToRequested, removeFromRequested } = useAppContext();

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const response = await axios.get(`${BOOK_DETAILS_URL}/${id}`);
        setBook(response.data);
      } catch (error) {
        console.error('Error fetching book details:', error);
      }
    };

    fetchBookDetails();
  }, [id]);

  const toggleDescription = () => {
    setIsOpen(!isOpen);
  };

  const handleApiCall = async (bookId: string, userId: string | null) => {
    try {
      if (book && isLoggedIn && userId) {
        if (Object.keys(reserved).length < 3) {
          const response = await axios.patch(`http://localhost:8081/book/reserve/${bookId}`, { userId });

          if (response.status === 200) {
            const updatedBook: Book = response.data;
            if (updatedBook.isReserved && updatedBook.reservedBy !== userId) {
              setErrorMessage("Book is already reserved by another user");
            } else {
              alert("Book reserved successfully");
              addToReserved(updatedBook);
              setErrorMessage(null);
            }
          } else {
            setErrorMessage("Failed to reserve book");
            removeFromReserved(bookId);
          }
        } else {
          alert("You can only reserve up to 3 books.");
        }
      } else {
        setErrorMessage("Book details, user information, or login status not available");
      }
    } catch (error) {
      console.error("API Error:", error);
      setErrorMessage("Failed to reserve book. Please try again.");
      removeFromReserved(bookId);
    }
  };

  const handleRequest = async (bookId: string, userId: string | null) => {
    try {
      if (book && isLoggedIn && userId) {
        if (Object.keys(requested).length < 3) {
          const response = await axios.patch(`http://localhost:8081/requestBook/${bookId}`, { userId });

          if (response.status === 200) {
            const updatedBook: Book = response.data;
            if (updatedBook.isReserved && updatedBook.reservedBy !== userId) {
              setErrorMessage("Book is already reserved by another user");
            } else {
              alert("Book requested successfully");
              addToRequested(updatedBook);
              setErrorMessage(null);
            }
          } else {
            setErrorMessage("Failed to request book");
            removeFromRequested(bookId);
          }
        } else {
          alert("You can only request up to 3 books.");
        }
      } else {
        setErrorMessage("Book details, user information, or login status not available");
      }
    } catch (error) {
      console.error("API Error:", error);
      setErrorMessage("Failed to request book. Please try again.");
      alert(error.response.data);
      removeFromRequested(bookId);
    }
  };

  if (!book) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className={`book-details ${isOpen ? 'open' : ''}`} onClick={toggleDescription}>
        <Link to="/bookList" className="back-arrow">&#8592;</Link>
        <div id="bookCont" className="bookCont">
          <div className="cover">
            <img src={book.imageUrl} alt={book.name} />
          </div>
          <div className="page"></div>
          <div className="page"></div>
          <div className="page"></div>
          <div className="page"></div>
          <div className="page"></div>
          <div className="page"></div>
          <div className="page"></div>
          <div className="page"></div>
          <div className="page"></div>
          <div className="page"></div>
        </div>
        <div className="buttons">
          {book.isBorrowed || book.isReserved ? (
            <p>{(book.isBorrowed && book.user !== userId) ? <button className="button-favv" onClick={() => handleRequest(book.id, userId)}>Request</button> : "This book is reserved."}</p>
          ) : (
            isLoggedIn && !book.isBorrowed && !book.isReserved ? (
              <button
                className="button-favv"
                style={{ backgroundColor: "#7C5C50", color: "white" }}
                onClick={() => {
                  if (book) {
                    addToReserved(book);
                    handleApiCall(book.id, userId);
                  }
                }}
              >
                Reserve
              </button>
            ) : (
              !isLoggedIn && <p className="erLogin">Please log in to reserve this book!</p>
            )
          )}
        </div>
        <div className="details-container">
          <h1> Name: <span className="des">{book.name}</span></h1>
          <h1>Author: <span className="des">{book.author}</span></h1>
          <h1>Location: <span className="des">{book.location}</span></h1>
          <h1>Description: <span className="des">{book.description}</span></h1>
        </div>
      </div>
    </div>
  );
}

export default BookDetails;
