import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useAppContext } from "./context/appContext";
import { useAuth } from "./context/authContext";
import "./favorites.css";

interface FavoritesProps {
  setToken: React.Dispatch<React.SetStateAction<string | null>>;
}

const Favorites: React.FC<FavoritesProps> = ({ setToken }) => {
  const { reserved, addToReserved, removeFromReserved } = useAppContext() || { reserved: {}, addToReserved: () => {}, removeFromReserved: () => {} };
  const navigate = useNavigate();
  const { userId, isLoggedIn } = useAuth();
  console.log("userID:", userId);

  const fetchReservedBooks = async (userId: string | null) => {
    try {
      if (isLoggedIn && userId) {
        console.log("Fetching reserved books...");
        const response = await axios.get(`http://localhost:8081/api/v1/user/reservedBooks/${userId}`);

        if (response.status === 200) {
          const data = response.data;
          addToReserved(data);
          console.log("Data received from the server: ", data);
        } else {
          console.error('API Error:', response.statusText);
        }
      } else {
        console.log("Not logged in or missing user ID");
      }
    } catch (error) {
      console.error('API Error:', error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await fetchReservedBooks(userId);
      console.log("Updated reserved state:", reserved); // Log the updated reserved state here
    };

    fetchData();
  }, [isLoggedIn, userId, addToReserved]);

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
    return reserved[id] !== undefined;
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
            addToReserved(book);
          }
        }
      } catch (error) {
        console.error('API Error:', error);
      }
    }
  };

  return (
    <div className="favorites-container">
      <div className="favorites">
        {Object.keys(reserved).length > 0 ? (
          Object.keys(reserved).map((id) => {
            const book = reserved[id];
            return (
              <div key={id} className="book-container">
                <div className="book">
                  <div className="book-info">
                    <h4>{book.name}</h4>
                    <img src={book.imageUrl} alt="#" />
                  </div>
                  <div className="button-container">
                    {reservedChecker(book.id) ? (
                      <button
                        className="button-fav"
                        onClick={() => {
                          removeFromReserved(book.id);
                          handleUndoReserve(book.id);
                        }}
                      >
                        Undo Reserve
                      </button>
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
          <h1 className="nobookk">You don't have any reserved books yet!</h1>
        )}
      </div>
    </div>
  );
  
};

export default Favorites;