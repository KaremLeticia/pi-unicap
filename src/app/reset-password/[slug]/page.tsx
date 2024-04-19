"use client"
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import axios from 'axios';

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
    <div>
      <h1>Redefinir Senha</h1>
      <p>Token de redefinição de senha: {params.slug}</p>
      <p>Insira sua nova senha:</p>
      <input
        type="password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
      />
      <button onClick={handleResetPassword}>Redefinir Senha</button>
    </div>
  );
}
