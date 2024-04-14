"use client"
import React, { createContext, useContext, useState, ReactNode } from 'react';
import axios from 'axios';
import jwt from 'jsonwebtoken';
import { useRouter } from 'next/navigation';

// Defina o formato da resposta de login
interface LoginResponse {
  token: string;
}

// Defina o formato do usuário autenticado
interface AuthUser {
  role: string;
}

// Defina o formato do contexto de autenticação
interface AuthContextType {
  user: AuthUser | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

// Crie o contexto de autenticação
const AuthContext = createContext<AuthContextType | null>(null);

// Componente de provedor de contexto de autenticação
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const router = useRouter();

  // Função de login
  const login = async (email: string, password: string) => {
    try {
      const formData = { email, password };
      const response = await axios.post<LoginResponse>(`${process.env.NEXT_PUBLIC_BACKEND_PROD_BASE_URL}/users/sessions`, formData);

      // Decodifique o token para obter a role do usuário
      const decodedToken = jwt.decode(response.data.token) as AuthUser;

      // Armazene o token e o usuário no estado e no localStorage
      setUser(decodedToken);
      localStorage.setItem('userToken', response.data.token);

      // Redirecione para a página apropriada com base na role do usuário
      if (decodedToken.role === 'ADMIN') {
        router.push('/dashboard');
      } else if (decodedToken.role === 'STUDENT') {
        router.push('/home');
      } else {
        console.log('Acesso negado');
      }
   
    } catch (error) {
      if (error instanceof Error) {
        console.error('Erro durante o login:', error.message);
      } else {
        console.error('Erro durante o login:', error);
      }
    }
  };

  // Função de logout
  const logout = () => {
    setUser(null);
    localStorage.removeItem('userToken');
    // Redirecione para a página de login ou homepage, conforme necessário
  };

  // Retorne o provedor de contexto de autenticação com os valores e funções necessários
  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook personalizado para acessar o contexto de autenticação
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
};
