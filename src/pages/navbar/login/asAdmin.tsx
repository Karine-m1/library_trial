import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../MyBooks/MyBooks.css";
import "./adminBooks.css";

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  genre: string;
  address: string;
  email: string;
  mobile: string;
}

interface Book {
  id: string;
  name: string;
  userId: string;
}

interface UserProps {
  setToken: React.Dispatch<React.SetStateAction<string | null>>;
}

const Admin: React.FC<UserProps> = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [reservedBooks, setReservedBooks] = useState<{ [userId: string]: Book[] }>({});
  const [borrowedBooks, setBorrowedBooks] = useState<{ [userId: string]: Book[] }>({});
  const [passed, setPassed] = useState<{ [userId: string]: Book[] }>({});

  useEffect(() => {
    let isMounted = true;

    const fetchUsers = async () => {
      try {
        setLoading(true);
        const response = await axios.get("http://localhost:8081/api/v1/user/getUser", { withCredentials: true });
        if (isMounted) {
          setUsers(response.data);
          setError(null);
        }
      } catch (error) {
        console.error('API Error:', error);
        if (isMounted) {
          setError('Error fetching users. Please try again.');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchUsers();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    const fetchPassed = async () => {
      const passedBooks: { [userId: string]: Book[] } = {};
    
      for (const user of users) {
        try {
          const passedResponse = await axios.get(`http://localhost:8081/api/v1/user/deadline/${user.id}`);
          const bookNames = passedResponse.data.split('\n'); // Split the response string by newline character
          const books = bookNames.map((name: any) => ({ id: '', name, userId: user.id })); // Create Book objects
          passedBooks[user.id] = books;
        } catch (error) {
          console.error('API Error:', error);
        }
      }
    
      setPassed(passedBooks);
    };
    
    
    fetchPassed();
  }, [users]);

  useEffect(() => {
    const fetchBooksData = async () => {
      const reservedData: { [userId: string]: Book[] } = {};
      const borrowedData: { [userId: string]: Book[] } = {};

      for (const user of users) {
        try {
          const reservedResponse = await axios.get(`http://localhost:8081/api/v1/user/reservedBooks/${user.id}`);
          reservedData[user.id] = reservedResponse.data;

          const borrowedResponse = await axios.get(`http://localhost:8081/api/v1/user/borrowedBooks/${user.id}`);
          borrowedData[user.id] = borrowedResponse.data;
        } catch (error) {
          console.error('API Error:', error);
        }
      }

      setReservedBooks(reservedData);
      setBorrowedBooks(borrowedData);
    };

    fetchBooksData();
  }, [users]);

  return (
    <div className="base_list">
      {loading && <p>Loading...</p>}
      {error && <p className="error-message">{error}</p>}
      <Link to="/Inventory" className="back-arrow">&#8592; Inventory</Link>
      <table className="book-base-list">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Address</th>
            <th>Reserved</th>
            <th>Borrowed</th>
            <th>Missed Deadline</th>
          </tr>
          {/* &#x2713; */}
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="book-base">
              <td>{user.id}</td>
              <td>{user.firstName} {user.lastName}</td>
              <td>{user.email}</td>
              <td>{user.mobile}</td>
              <td>{user.address}</td>
              <td>
                {/* Display reserved books */}
                <ul style={{ listStyleType: 'none' }}>
                  {reservedBooks[user.id]?.map((book: Book) => (
                    <li key={book.id}>{book.name}</li>
                  ))}
                </ul>
              </td>
              <td>
                {/* Display borrowed books */}
                <ul style={{ listStyleType: 'none' }}>
                  {borrowedBooks[user.id]?.map((book: Book) => (
                    <li key={book.id}>{book.name}</li>
                  ))}
                </ul>
              </td>
              <td>
                {/* Display passed books */}
                <ul style={{ listStyleType: 'none' }}>
                  {passed[user.id]?.map((book: Book) => (
                    <li key={book.id}>{book.name}</li>
                  ))}
                </ul>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Admin;
