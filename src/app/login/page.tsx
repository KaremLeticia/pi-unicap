"use client"
import axios from "axios";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/contexts/UserProvider";

const Login: React.FC = () => {
  const { setUserId } = useUser();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | undefined>(undefined);
  const router = useRouter();

  const handleLogin = async () => {
    try {
      const response = await axios.post('/api/login', {
        email,
        password,
      });

      console.log('Resposta do login:', response.data);
      setUserId(response.data.userId);
      router.push('/dashboard');
    } catch (err: any) {
      console.error('Erro durante o login:', err.response?.data);
      setError('Credenciais inválidas.');
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <div>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <label>Senha:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button onClick={handleLogin}>Login</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default Login;
