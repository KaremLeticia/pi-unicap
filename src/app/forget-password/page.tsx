"use client"
import Image from "next/image";
import React, { useState, ReactNode } from "react";
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import { Person } from '@mui/icons-material';
import principal from '../../app/assets/principal.png';
import logo from '../../app/assets/logo1.png';
import { FormControl } from "@mui/material";
import axios from "axios";
import { Ban, LoaderCircle, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

interface TailwindButtonProps {
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => Promise<void>;
  children: ReactNode;
}

const AlertDialogDemo = ({ message, variant }: { message: { message: any }, variant: "default" | "destructive" }) => (
  <div className={`bg-white rounded border-2 border-slate-900 text-black p-4 fixed bottom-0 right-0 m-4`}>
    {variant === 'destructive' ? <Ban className="inline-block mr-2" /> : <Star className="inline-block mr-2" />}
    {message.message}!
  </div>
);


export default function ForgetPassword() {

  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertVariant, setAlertVariant] = useState<'default' | 'destructive'>('default');
  const router = useRouter();

  const handleBackLogin = (e: any) => {
    router.push('/')
  };


  const handleForgetPassword = async () => {
    try {
      setLoading(true);
      // Send request to reset password with email
      const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_PROD_BASE_URL}/users/forget-password`, {
        email: email,
      });

      // Handle response
      console.log(response.data);
      setAlertMessage(response.data);
      setAlertVariant('default');
    } catch (error) {
      console.error('Error:', error);
      setAlertMessage('Erro ao processar solicitação.');
      setAlertVariant('destructive');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="bg-gray-200 flex justify-center items-center h-screen">
      <section className="w-full h-screen bg-white md:w-1/2  md:flex ">
        <div className="w-full md:w-1/2 mt-4 md:mt-0 flex items-center justify-center">
          <Image
            src={principal}
            alt="Imagem campus"
          />
        </div>
        <div className="w-full md:w-1/2 md:pr-4 bg-grayPrincipal p-6 flex flex-col justify-center">
          <Image
            src={logo}
            alt="logo unicap"
          />
          <FormControl className="space-y-3 mt-4">
            <TextField
              label="Email"
              variant="outlined"
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

            <button onClick={handleForgetPassword} className="bg-default w-full h-10 rounded self-center hover:bg-default/90 text-white relative">
              {loading ? <LoaderCircle className="absolute inset-0 m-auto animate-spin" /> : "Recuperar senha"}
            </button>
          </FormControl>
          {alertMessage && <AlertDialogDemo message={alertMessage} variant={alertVariant} />}
          <Button onClick={handleBackLogin} variant='ghost'>{'\u00A0'}<span className='underline'>{`${'\n'} Voltar para Login`}</span></Button>

        </div>
      </section>
    </main>
  );
}
