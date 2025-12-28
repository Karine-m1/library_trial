// appContext.tsx
import React, { createContext, ReactNode, useContext, useState } from "react";
import { Book } from "../../login/adminBooks";

interface Borrowed {
  [key: string]: Book;
}

interface ContextProps {
  borrowed: Borrowed;
  addToBorrowed: (books: Book | Book[]) => void;
  removeFromBorrowed: (id: string) => void;
}

const defaultValue: ContextProps = {
  borrowed: {},
  addToBorrowed: () => {},
  removeFromBorrowed: () => {},
};

const AppContext = createContext<ContextProps>(defaultValue);

export const useAppContext = (): ContextProps => {
  const context = useContext(AppContext);

  if (!context) {
    console.error("useAppContext must be used within AppContextProvider");
  }

  return context || defaultValue;
};

interface AppContextProviderProps {
  children: ReactNode;
}

const BorrowedContext: React.FC<AppContextProviderProps> = ({ children }) => {
  const [borrowed, setBorrowed] = useState<Borrowed>({}); // Add setReserved state

  const addToBorrowed = (books: Book | Book[]) => {
    setBorrowed((prevBorrowed) => {
      const newBorrowed = { ...prevBorrowed };
      const booksToAdd = Array.isArray(books) ? books : [books];
  
      if (Object.keys(newBorrowed).length + booksToAdd.length > 3) {
        // alert("Cannot add more than 3 books to reserved");
        return newBorrowed; // Return current state if adding more than 3 books would exceed the limit
      }
  
      booksToAdd.forEach((book) => {
        newBorrowed[book.id] = book;
      });
  
      return newBorrowed;
    });
  };

  const removeFromBorrowed = (id: string) => {
    setBorrowed((prevBorrowed) => {
      const newBorrowed = { ...prevBorrowed };
      delete newBorrowed[id];
      return newBorrowed;
    });
  };

  return (
    <AppContext.Provider value={{ borrowed, addToBorrowed, removeFromBorrowed }}>
      {children}
    </AppContext.Provider>
  );
};

export default BorrowedContext;
