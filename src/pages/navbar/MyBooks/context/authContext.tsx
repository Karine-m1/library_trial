// authContext.tsx
import { ReactNode, createContext, useContext, useEffect, useState } from 'react';

interface AuthContextType {
  isLoggedIn: boolean;
  login: (token: string, userId:string) => void;
  logout: () => void;
  userId : string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    console.log('Effect: Checking token');
    const storedToken = localStorage.getItem('userToken');
    const storedUserId = localStorage.getItem('userId');
    if (storedToken && storedUserId) {
      login(storedToken, storedUserId);
    }
  }, []);

  const login = (token: string, userId: string) => {
    console.log('Login function called');
    setUserId(userId);
    setLoggedIn(true);
  };

  const logout = () => {
    // Log out the user
    setLoggedIn(false);
    setUserId(null);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout,userId }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
