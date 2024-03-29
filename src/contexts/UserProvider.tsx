"use client"
import { createContext, useContext, ReactNode, useState, Dispatch, SetStateAction } from 'react';

interface UserContextProps {
  children: ReactNode;
}

interface UserContextData {
  userId: string | null;
  setUserId: Dispatch<SetStateAction<string | null>>;
  setUserToken: Dispatch<SetStateAction<string | null>>; // Adiciona setUserToken à interface
}

const UserContext = createContext<UserContextData | undefined>(undefined);

export const UserProvider: React.FC<UserContextProps> = ({ children }) => {
  const [userId, setUserId] = useState<string | null>(null);
  const [userToken, setUserToken] = useState<string | null>(null); // Inicializa o estado do token

  return (
    <UserContext.Provider value={{ userId, setUserId, setUserToken }}> {/* Adiciona setUserToken ao value */}
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
