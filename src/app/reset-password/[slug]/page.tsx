"use client"
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import axios from 'axios';
import logo from '../../assets/logo1.png'
import Image from 'next/image';

export default function Page({ params }: { params: { slug: string } }) {
  const [newPassword, setNewPassword] = useState('');
  const searchParams = useSearchParams();
  const slug = searchParams.get('slug');

  const handleResetPassword = async () => {
    try {
      // Enviar solicitação para redefinir senha
      const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_PROD_BASE_URL}/users/change-password`, {
        tokenPassword: params.slug,
        newPassword: newPassword
      });

      // Verificar se a solicitação foi bem-sucedida
      if (response.status === 200) {
        console.log('Senha alterada com sucesso!');
      } else {
        console.error('Falha ao alterar senha.');
      }
    } catch (error) {
      console.error('Erro ao processar solicitação:', error);
    }
  };

  return (
    <main className='bg-gray-900 h-screen justify-center center p-16'>
      <div className="max-w-md mx-auto p-6 bg-gray-100 rounded-lg shadow-xl flex flex-col justify-center">
      <Image
            src={logo}
            alt="Logo Unicap Sistema de Avaliação"
            loading="lazy"	
            className='p-6'
          />
        <h1 className="text-2xl font-bold mb-4">Redefinir Senha</h1>
        <p className="mt-4">Insira sua nova senha:</p>
        <input
          className="border border-gray-300 rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring focus:white"
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <button
          className="bg-default text-white rounded-md px-4 py-2 mt-4 hover:bg-default focus:outline-none focus:ring focus:bg-default"
          onClick={handleResetPassword}
        >
          Redefinir Senha
        </button>

      </div>
    </main>

  );
}
