// TokenContext.tsx
import React, { Dispatch, ReactNode, SetStateAction, createContext, useContext, useState } from 'react';

interface TokenContextProps {
  children: ReactNode;
}

interface TokenContextValue {
  token: string | null;
  setToken: Dispatch<SetStateAction<string | null>>;
}

const TokenContext = createContext<TokenContextValue | undefined>(undefined);

export const TokenProvider: React.FC<TokenContextProps> = ({ children }) => {
  const storedToken = localStorage.getItem('userToken');
  const [token, setToken] = useState<string | null>(storedToken);

  const updateToken: React.Dispatch<React.SetStateAction<string | null>> = (newToken) => {
    if (typeof newToken === 'string' || newToken === null) {
      localStorage.setItem('userToken', newToken || ''); // Set to an empty string if null
      setToken(newToken);
    }
  };

  return (
    <TokenContext.Provider value={{ token, setToken: updateToken }}>
      {children}
    </TokenContext.Provider>
  );
};

export const useToken = (): TokenContextValue => {
  const context = useContext(TokenContext);
  if (!context) {
    throw new Error('useToken must be used within a TokenProvider');
  }
  return context;
};
