"use client"
import { createContext, useContext, ReactNode, useState, Dispatch, SetStateAction } from 'react';

interface UserContextProps {
  children: ReactNode;
}

interface UserContextData {
  userId: string | null;
  setUserId: Dispatch<SetStateAction<string | null>>;
}

const UserContext = createContext<UserContextData | undefined>(undefined);

export const UserProvider: React.FC<UserContextProps> = ({ children }) => {
  const [userId, setUserId] = useState<string | null>(null);

  return (
    <UserContext.Provider value={{ userId, setUserId }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }

  return context;
};
