"use client"
import Image from "next/image";
import React, { useState, ReactNode } from "react";
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import { Lock, Person } from '@mui/icons-material';

import principal from '../app/assets/principal.png'
import logo from '../app/assets/logo.svg'
import { Checkbox, FormControl, FormControlLabel } from "@mui/material";
import Modal from "./components/Modal";

import { useRouter } from 'next/navigation'

interface TailwindButtonProps {
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => Promise<void>;
  children: ReactNode;
}

const TailwindButton = ({ onClick, children }: TailwindButtonProps) => {
  return (
    <button onClick={onClick} className="bg-default w-96 h-10 rounded self-center hover:bg-default/90">
      {children}
    </button>
  );
};

export default function Login() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  


  const router = useRouter();
  const [input, setInput] = useState('')

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
    console.log('Valor do input:', e.target.value); // Log para verificar o valor do input
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

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
              label="RA"
              value={input}
              onChange={handleInputChange}
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
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock />
                  </InputAdornment>
                ),
              }}
            />
            <FormControlLabel control={<Checkbox />} color="primary" label="Manter conectado" sx={{ color: 'black' }} />
            <TailwindButton onClick={handleSubmit} children="Acessar" />
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
  )
}
