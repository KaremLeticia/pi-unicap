"use client"
import { useRouter } from 'next/router';
import { useState } from 'react';

const ResetPasswordPage = () => {
  const router = useRouter();
  const { tokenPassword } = router.query;

  const [newPassword, setNewPassword] = useState('');

  const handleResetPassword = async () => {
    // Lógica para redefinir a senha usando o tokenPassword
  };

  return (
    <div>
      <h1>Redefinir Senha</h1>
      <p>Token de redefinição de senha: {tokenPassword}</p>
      <p>Insira sua nova senha:</p>
      <input
        type="password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
      />
      <button onClick={handleResetPassword}>Redefinir Senha</button>
    </div>
  );
};

export default ResetPasswordPage;
