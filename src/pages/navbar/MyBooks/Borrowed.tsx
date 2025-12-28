import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useAppContext } from "./context/ContextBorrowed";
import { useAuth } from "./context/authContext";
import "./favorites.css";

interface FavoritesProps {
  setToken: React.Dispatch<React.SetStateAction<string | null>>;
}

const Borrowed: React.FC<FavoritesProps> = ({ setToken }) => {
  const { borrowed, addToBorrowed, removeFromBorrowed } = useAppContext() || { borrowed: {}, addToBorrowed: () => {}, removeFromBorrowed: () => {} };
  const navigate = useNavigate();
  const { userId, isLoggedIn } = useAuth();
  console.log("userID:", userId);
  const [isDataFetched, setIsDataFetched] = useState<boolean>(false);

  useEffect(() => {
    if (isLoggedIn && userId && !isDataFetched) {
      fetchData();
    }
  }, [isLoggedIn, userId, isDataFetched]);

  const fetchData = async () => {
    try {
      console.log("Fetching reserved books...");
      const response = await axios.get(`http://localhost:8081/api/v1/user/borrowedBooks/${userId}`);
      if (response.status === 200) {
        const data = response.data;
        addToBorrowed(data);
        console.log("Data received from the server: ", data);
        setIsDataFetched(true);
      } else {
        console.error('API Error:', response.statusText);
      }
    } catch (error) {
      console.error('API Error:', error);
    }
  };

  const logOutHandler = () => {
    setToken("");
    localStorage.clear();
    navigate('/login');
  };

  const handleUndoReserve = async (bookId: string) => {
    try {
      const response = await fetch(`http://localhost:8081/book/removeReserve/${bookId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
      });
    } catch (error) {
      console.error('API Error:', error);
    }
  };

  const reservedChecker = (id: string) => {
    return borrowed[id] !== undefined;
  };

  const handleReserve = async (book: any) => {
    if (reservedChecker(book.id)) {
      alert('This book is already reserved. You cannot reserve it again.');
    } else {
      try {
        const response = await axios.get(`http://localhost:8081/book/${book.id}`);
        if (response.data.reserved) {
          alert('This book is already reserved. You cannot reserve it again.');
        } else {
          const reserveResponse = await axios.patch(`http://localhost:8081/book/reserve/${book.id}`);
          console.log('Reservation response:', reserveResponse.data);

          if (reserveResponse.status === 200) {
            addToBorrowed(book);
          }
        }
      } catch (error) {
        console.error('API Error:', error);
      }
    }
  };

  const handleExtendDeadline = async (book: any) => {
    try {
      const response = await axios.patch(`http://localhost:8081/api/v1/user/extendBookDeadline/${book.id}`);
      if (response.data) {
        alert(response.data);
        console.log("hey you can't");
      }
    } catch (error) {
      console.error('API Error:', error);
      // Check if there's a response and data to display in the alert
      if (error.response && error.response.data) {
        alert(`${error.response.data}`);
      } else {
        alert('An unexpected error occurred.');
      }
    }
  };

  return (
    <div className="favorites-container">
      <div className="favorites">
        {Object.keys(borrowed).length > 0 ? (
          Object.keys(borrowed).map((id) => {
            const book = borrowed[id];
            return (
              <div key={id} className="book-container">
                <div className="bookR">
                  <div className="book-info">
                    <h4>{book.name}</h4>
                    <img src={book.imageUrl} alt="#" />
                  </div>
                  <div className="button-container">
                    {reservedChecker(book.id) ? (
                      <div>
                      <button
                        className="button-borrow"
                        onClick={() => {
                          handleExtendDeadline(book);
                        }}
                      >
                        Extend deadline
                      </button>
                      Deadline: {book.dueDate.toString()}
                      </div>
                    ) : (
                      <button
                        className="button-fav"
                        onClick={() => handleReserve(book)}
                      >
                        Reserve
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <h1 className="nobookk">You don't have any borrowed books yet!</h1>
        )}
      </div>
    </div>
  );
};

export default Borrowed;
