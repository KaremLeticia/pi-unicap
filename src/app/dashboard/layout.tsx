"use client";
import { useEffect } from 'react';
import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import { checkUserTokenValidity } from '@/lib/auth'; // Importando a função checkAccessTokenValidity do auth.ts
import { MobileNavBar } from '@/app/components/MobileNavBar';
import Sidebar from '@/app/components/Sidebar';
import { useRouter } from 'next/navigation';


export default function Layout({ children }: any) {
  const router = useRouter();
  const SideBarWidth = 224;
  const SidesMargin = 48;
  const MobileSidesMargin = 12;

  useEffect(() => {
    console.log("Layout montado. Verificando validade do token de usuário...");
    checkUserTokenValidity(); // Verificar a validade do token de acesso ao montar o componente
  }, []);

  // Configuração global do Axios para interceptar e renovar automaticamente o token de acesso expirado
  axios.interceptors.request.use(
    async (config) => {

      await checkUserTokenValidity();
      const userToken = localStorage.getItem('userToken');
      if (userToken) {
        // Decodificar o token JWT para acessar informações do usuário
        const decodedToken = decodeJWT(userToken);
        
        // Verificar se o usuário é ADMIN
        if (decodedToken && decodedToken.role === 'ADMIN') {
          config.headers = config.headers || {};
          config.headers['Authorization'] = `Bearer ${userToken}`;
        } else {
          router.push('/not-found')
        }
      }
      console.log("Solicitação interceptada:", config);
      return config;
    },
    (error) => {
      console.error("Erro na interceptação de solicitação:", error);
      return Promise.reject(error);
    }
  );

  // Função para decodificar o token JWT
  function decodeJWT(token: string) {
    try {
      const payload = token.split('.')[1];
      return JSON.parse(atob(payload));
    } catch (error) {
      console.error('Erro ao decodificar o token JWT:', error);
      return null;
    }
  }
  
  return (
    <div>
      <div className="flex max-sm:flex-col bg-muted/40">
        <MobileNavBar />
        <Sidebar />

        <main
          className={`
          p-5
          w-full
          max-w-6xl my-12 mx-auto
          max-sm:w-[calc(100%_-_${MobileSidesMargin * 2}px)] max-sm:mt-0
          min-[640px]:w-[calc(100%_-_${SidesMargin * 2}px_-_${SideBarWidth}px)]
          `}
        >
          {children}
        </main>
      </div>
    </div>
  );
}
