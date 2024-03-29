import { useEffect } from 'react';
import jwt from 'jsonwebtoken';
import { useRouter } from 'next/router';
import { useUser } from '@/contexts/UserProvider';

interface TokenPayload {
  role: string;
}

const verifyRole = (token: string): string | null => {
  try {
    const decodedToken = jwt.verify(token, 'JWT_SECRET') as TokenPayload;
    return decodedToken.role;
  } catch (error) {
    return null;
  }
};

const useVerifyRole = (token: string): void => {
  const { userId } = useUser();
  const router = useRouter();

  useEffect(() => {
    console.log('userId:', userId); // Log do userId
    console.log('token:', token); // Log do token
    if (userId) {
      const role = verifyRole(token);
      console.log('Role:', role); // Log da função do usuário
      if (role === 'ADMIN') {
        console.log('Redirecionando para /dashboard'); // Log do redirecionamento
        router.push('/dashboard');
      } else if (role === 'STUDENT') {
        console.log('Redirecionando para /review'); // Log do redirecionamento
        router.push('/review');
      } else {
        console.log('Acesso negado');
      }
    }
  }, [userId, token]);
};

export default useVerifyRole;
