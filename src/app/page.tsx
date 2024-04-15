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
import { Loader2 } from 'lucide-react';
import { useRole } from '@/contexts/RoleContext';

interface LoginResponse {
  token: string;
  role: Role;
}

type Role = 'ADMIN' | 'STUDENT';


export default function Login() {
  const { setUserId, setUserToken } = useUser();
  const router = useRouter(); // Instancie o useRouter
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false); // Estado para controlar o carregamento
  const [error, setError] = useState<string | undefined>(undefined);
  const { setRole } = useRole();


  const handleLogin = async () => {
    try {
      const formData = { email, password };
      const response = await axios.post<LoginResponse>(`${process.env.NEXT_PUBLIC_BACKEND_PROD_BASE_URL}/users/sessions`, formData);

      setRole(response.data.role); // Defina a role no contexto do usuário
      console.log(response.data.role)
      // Redirecione com base na role do usuário
      if (response.data.role === 'ADMIN') {
        router.push('/dashboard/admin');
      } else if (response.data.role === 'STUDENT') {
        router.push('/home');
      } else {
        console.log('Acesso negado');
      }
    } catch (err: any) {
      console.error('Erro durante o login:', err.response?.data);
      setError('Credenciais inválidas.');
    } finally {
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
            <button onClick={handleLogin} className="bg-default w-full h-10 rounded self-center hover:bg-default/90 text-white relative">
              {loading ? <Loader2 className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 h-4 w-4 animate-spin" /> : "Acessar"}
            </button>
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
