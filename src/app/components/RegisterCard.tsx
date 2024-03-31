"use client"
import { useState } from 'react';
import axios from 'axios';
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { BookOpen, BriefcaseMedical, Landmark, Loader2, PenTool, Rocket, Tv } from "lucide-react"

export function CardsCreateAccount() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    surname: '',
    studentRegister: '',
    school: ''
  });
  const [loading, setLoading] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const [selectedSchool, setSelectedSchool] = useState('');

  const handleSchoolChange = (value: any) => {
    setSelectedSchool(value);
    console.log('Escola selecionada:', value);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (selectedSchool === '') {
      console.error('Por favor, selecione uma escola.');
      return;
    }
    try {
      setLoading(true);
      const updatedFormData = { ...formData, school: selectedSchool };
      const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_PROD_BASE_URL}/users/register`, updatedFormData);
      setLoading(false);
      console.log('Resposta da API:', response.data);
      if (response.status === 200) {
        setAlertMessage("CADASTRADO");
      }
    } catch (error) {
      setLoading(false);
      console.error('Erro ao enviar os dados para a API:', error);
    }
  };

  return (
    <Card className='gap-4'>
      <CardHeader className="space-y-2">
        <CardTitle className="text-2xl">Crie sua conta</CardTitle>
        <CardDescription>
          Entre com o e-mail institucional
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <form onSubmit={handleSubmit}>
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
          </div>
          <div className="grid gap-2 mt-2">
            <Label htmlFor="name">Nome</Label>
            <Input id="name" type="text" placeholder="John" onChange={handleChange} />
          </div>
          <div className="grid gap-2 mt-2">
            <Label htmlFor="surname">Sobrenome</Label>
            <Input id="surname" type="text" placeholder="Doe" onChange={handleChange} />
          </div>
          <div className="grid gap-2 mt-2">
            <Label htmlFor="studentRegister">RA/Matrícula</Label>
            <Input id="studentRegister" type="numeric" placeholder="00000XXXXX" onChange={handleChange} />
          </div>
          <div className="grid gap-2 mt-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="m@example.com" onChange={handleChange} />
          </div>
          <div className="grid gap-2 mt-2">
            <Label htmlFor="password">Senha</Label>
            <Input id="password" type="password" onChange={handleChange} />
          </div>
          <div className="grid gap-3 mt-2 mb-4">
            <Label htmlFor="select-school">Escola</Label>
            <Select
              onValueChange={(value) => {
                setSelectedSchool(value); // Atualizar o estado selectedSchool
                console.log('Escola:', value);
              }}
            >

              <SelectTrigger
                id="select-school"
                className="items-start [&_[data-description]]:hidden"
              >
                <SelectValue placeholder="Selecione uma escola" />
              </SelectTrigger>
              <SelectContent className="bg-white">
                <SelectItem value="Icam-tech" onSelect={() => handleSchoolChange("Icam-tech")}>
                  <div className="flex items-start gap-3 text-muted-foreground">
                    <Rocket className="size-5" />
                    <div className="grid gap-0.5">
                      <span className="font-medium text-foreground">
                        Icam-tech
                      </span>
                    </div>
                  </div>
                </SelectItem>
                <SelectItem value="Comunicação" onSelect={() => handleSchoolChange("Comunicação")}>
                  <div className="flex items-start gap-3 text-muted-foreground">
                    <Tv className="size-5" />
                    <div className="grid gap-0.5">
                      <span className="font-medium text-foreground">
                        Comunicação
                      </span>
                    </div>
                  </div>
                </SelectItem>
                <SelectItem value="Ciências Jurídicas" onSelect={() => handleSchoolChange("Ciências Jurídicas")}>
                  <div className="flex items-start gap-3 text-muted-foreground">
                    <PenTool className="size-5" />
                    <div className="grid gap-0.5">
                      <span className="font-medium text-foreground">
                      Ciências Jurídicas
                      </span>
                    </div>
                  </div>
                </SelectItem>
                <SelectItem value="Gestão, Economia e Política" onSelect={() => handleSchoolChange("Gestão, Economia e Política")}>
                  <div className="flex items-start gap-3 text-muted-foreground">
                    <Landmark className="size-5" />
                    <div className="grid gap-0.5">
                      <span className="font-medium text-foreground">
                      Gestão, Economia e Política
                      </span>
                    </div>
                  </div>
                </SelectItem>
                <SelectItem value="Educação e Humanidades" onSelect={() => handleSchoolChange("Educação e Humanidades")}>
                  <div className="flex items-start gap-3 text-muted-foreground">
                    <BookOpen className="size-5" />
                    <div className="grid gap-0.5">
                      <span className="font-medium text-foreground">
                      Educação e Humanidades
                      </span>
                    </div>
                  </div>
                </SelectItem>
                <SelectItem value="Saúde e Ciências da Vida" onSelect={() => handleSchoolChange("Saúde e Ciências da Vida")}>
                  <div className="flex items-start gap-3 text-muted-foreground">
                    <BriefcaseMedical className="size-5" />
                    <div className="grid gap-0.5">
                      <span className="font-medium text-foreground">
                      Saúde e Ciências da Vida
                      </span>
                    </div>
                  </div>
                </SelectItem>

                {/* Outras opções de escola aqui */}
              </SelectContent>
            </Select>
          </div>
       <CardFooter>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Criar conta"}
            </Button>
          </CardFooter>
        </form>
      </CardContent>
      {alertMessage && (
        <div className="bg-green-500 text-white p-4 fixed bottom-0 right-0 m-4">
          {alertMessage}
        </div>
      )}
    </Card>
  );
}
