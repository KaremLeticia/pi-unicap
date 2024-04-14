"use client"
import { createContext, useContext, useState } from 'react';

type RoleType = 'ADMIN' | 'STUDENT' | null;

interface RoleContextType {
  role: RoleType;
  setRole: (role: RoleType) => void;
}

const RoleContext = createContext<RoleContextType>({
  role: null,
  setRole: () => {},
});

export function useRole() {
  return useContext(RoleContext);
}

export function RoleProvider({ children }: any) {
  const [role, setRole] = useState<RoleType>(null);

  return (
    <RoleContext.Provider value={{ role, setRole }}>
      {children}
    </RoleContext.Provider>
  );
}
