import React, { createContext, ReactNode, useContext, useState } from "react";

interface Book {
  id: string;
  name: string;
  imageUrl: string;
  // Add other properties if needed
}

interface BookCollection {
  [key: string]: Book;
}

interface ContextProps {
  reserved: BookCollection;
  requested: BookCollection;
  addToReserved: (books: Book | Book[]) => void;
  removeFromReserved: (id: string) => void;
  addToRequested: (books: Book | Book[]) => void;
  removeFromRequested: (id: string) => void;
}

const defaultValue: ContextProps = {
  reserved: {},
  requested: {},
  addToReserved: () => {},
  removeFromReserved: () => {},
  addToRequested: () => {},
  removeFromRequested: () => {},
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

const AppContextProvider: React.FC<AppContextProviderProps> = ({ children }) => {
  const [reserved, setReserved] = useState<BookCollection>({});
  const [requested, setRequested] = useState<BookCollection>({});

  const addToReserved = (books: Book | Book[]) => {
    setReserved((prevReserved) => {
      const newReserved = { ...prevReserved };
      const booksToAdd = Array.isArray(books) ? books : [books];
  
      if (Object.keys(newReserved).length + booksToAdd.length > 3) {
        return newReserved;
      }
  
      booksToAdd.forEach((book) => {
        newReserved[book.id] = book;
      });
  
      return newReserved;
    });
  };

  const removeFromReserved = (id: string) => {
    setReserved((prevReserved) => {
      const newReserved = { ...prevReserved };
      delete newReserved[id];
      return newReserved;
    });
  };

  const addToRequested = (books: Book | Book[]) => {
    setRequested((prevRequested) => {
      const newRequested = { ...prevRequested };
      const booksToAdd = Array.isArray(books) ? books : [books];
  
      if (Object.keys(newRequested).length + booksToAdd.length > 3) {
        return newRequested;
      }
  
      booksToAdd.forEach((book) => {
        newRequested[book.id] = book;
      });
  
      return newRequested;
    });
  };

  const removeFromRequested = (id: string) => {
    setRequested((prevRequested) => {
      const newRequested = { ...prevRequested };
      delete newRequested[id];
      return newRequested;
    });
  };

  return (
    <AppContext.Provider value={{ reserved, requested, addToReserved, removeFromReserved, addToRequested, removeFromRequested }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
