"use client"
import Image from "next/image";
import React, { useState, ReactNode, Dispatch, SetStateAction } from "react";
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import { Lock, Person } from '@mui/icons-material';

import principal from '../app/assets/principal.png';
import logo from '../app/assets/logo.svg';
import { Checkbox, FormControl, FormControlLabel } from "@mui/material";
import Modal from "./components/Modal";
import { useRouter } from "next/navigation";
import { useUser } from "@/contexts/UserProvider";
import axios from "axios";

interface TailwindButtonProps {
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => Promise<void>;
  children: ReactNode;
}

const TailwindButton = ({ onClick, children }: TailwindButtonProps) => {
  return (
    <button onClick={onClick} className="bg-default w-36 h-10 rounded self-center hover:bg-default/90 text-white">
      {children}
    </button>
  );
};


export default function Login() {
  const { setUserId } = useUser();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | undefined>(undefined);

  const router = useRouter();

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post('/api/login', {
        email,
        password,
      });

      console.log('Resposta do login:', response.data);
      setUserId(response.data.id);
      router.push('/dashboard');
    } catch (err: any) {
      console.error('Erro durante o login:', err.response?.data);
      setError('Credenciais inválidas.');
    }
  };


  return (
    <main className="bg-gray-200 flex justify-center items-center h-screen">
      <section className="w-full h-screen bg-white md:w-1/2  md:flex ">
        <div className="w-full md:w-1/2 md:pr-4 bg-grayPrincipal p-6 flex flex-col justify-center">
          <Image
            src={logo}
            alt="logo unicap"
          />
          <FormControl className="space-y-3 mt-4">
            <TextField
              id="outlined-required"
              label="E-mail"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Person />
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              id="outlined-required"
              label="Senha"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock />
                  </InputAdornment>
                ),
              }}
            />
            <FormControlLabel control={<Checkbox />} color="primary" label="Manter conectado" sx={{ color: 'black' }} />
            <TailwindButton onClick={handleLogin} children="Acessar" />
            <div>
              <button onClick={openModal}>Abrir Modal</button>
              {isModalOpen && (
                <Modal onClose={closeModal} />
              )}
            </div>
          </FormControl>
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
