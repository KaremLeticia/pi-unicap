"use client"
import { useEffect, useState } from 'react';
import axios from 'axios';
import Image from 'next/image';
import { FormControl } from '@mui/material';
import { Input } from '@/components/ui/input';
import logo from '../app/assets/logo.svg';
import principal from '../app/assets/principal.png';
import { useRouter } from "next/navigation";
import jwt from 'jsonwebtoken'; // Importe jwt para decodificar o token
import { useUser } from '@/contexts/UserProvider';
import { Button } from '@/components/ui/button';

interface LoginResponse {
  token: string;
  // Outros campos da resposta, se houverem
}

export default function Login() {
  const { setUserId, setUserToken } = useUser();
  const router = useRouter(); // Instancie o useRouter
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | undefined>(undefined);

  const handleLogin = async () => {
    try {
      const formData = { email, password };
      const response = await axios.post<LoginResponse>(`${process.env.NEXT_PUBLIC_BACKEND_PROD_BASE_URL}/users/sessions`, formData);

      console.log('Resposta do login:', response.data);
      setUserToken(response.data.token); // Armazena o token no contexto do usuário
      setUserToken(response.data.token); // Armazena o token no contexto do usuário
      localStorage.setItem('userToken', response.data.token); // Armazena o token no localStorage

      console.log('Token armazenado:', response.data.token); // Log do token armazenado

      // Decodifique o token para obter a role do usuário
      const decodedToken = jwt.decode(response.data.token) as { role: string };

      // Verifique a role do usuário e redirecione para a página apropriada
      if (decodedToken.role === 'ADMIN') {
        console.log('Redirecionando para /dashboard');
        router.push('/dashboard/admin');
      } else if (decodedToken.role === 'STUDENT') {
        console.log('Redirecionando para /review');
        router.push('/dashboard');
      } else {
        console.log('Acesso negado');
      }

      // Outras lógicas de redirecionamento ou manipulação de estado após o login
    } catch (err: any) {
      console.error('Erro durante o login:', err.response?.data);
      setError('Credenciais inválidas.');
    }
  };

  const handleRegister = async () => {
    router.push('/register');
  }
  
  
  return (
    <main className="bg-gray-200 flex justify-center items-center h-screen">
      <section className="w-full h-screen bg-white md:w-1/2  md:flex ">
        <div className="w-full md:w-1/2 md:pr-4 bg-grayPrincipal p-6 flex flex-col justify-center">
          <Image
            src={logo}
            alt="logo unicap"
          />
          <FormControl className="space-y-3 mt-4">
            <Input placeholder="E-mail" type="email" value={email} onChange={(e: any) => setEmail(e.target.value)} />
            <Input placeholder="Senha" type="password" value={password} onChange={(e: any) => setPassword(e.target.value)} />
            <button onClick={handleLogin} className="bg-default w-full h-10 rounded self-center hover:bg-default/90 text-white">Acessar</button>
          </FormControl>
          <Button onClick={handleRegister} variant='ghost'>Não possui cadastro?{'\u00A0'}<span className='underline'>{`${'\n'} Cadastre-se`}</span></Button>
        </div>
        <div className="w-full md:w-1/2 mt-4 md:mt-0 flex items-center justify-center">
          <Image
            src={principal}
            alt="Imagem campus"
          />
        </div>
      </section>
    </main>
  );
}
