"use client"
import React, { useEffect, useState } from 'react';
import { Vertical } from '@/app/components/Charts/Vertical';
import HorizontalBar from '@/app/components/Charts/HorizontalBar';
import HeaderSvg from '@/app/components/HeaderSvg';
import axios, { AxiosResponse } from 'axios';
import DoughnutChart from '@/app/components/Charts/DoughnutChart';
import { Chart, ArcElement } from 'chart.js';  // Importe isso para registrar os elementos
Chart.register(ArcElement);  // Registre o ArcElement

// Mantenha os tipos existentes
interface UserType {
  id: string;
  name: string | null;
  email: string;
  password: string;
  subjects: SubjectType[];
}

interface SubjectType {
  id: number;
  name: string;
  rating: string[];
  userId: string;
}

const Chat: React.FC = () => {
  const [userData, setUserData] = useState<UserType[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response: AxiosResponse<UserType[]> = await axios.get(`/api/users/`);
        setUserData(response.data);
      } catch (error) {
        console.error('Erro ao buscar dados da API:', error);
      }
    };

    fetchData();
  }, []);

  const getTotalRatings = (data: UserType[]) => {
    return data.reduce((total: number, user: UserType) => 
      total + user.subjects.reduce((acc: number, subject: SubjectType) => 
        acc + subject.rating.length, 0), 0);
  };

  const getAverageRating = (user: UserType) => {
    const totalRatings = user.subjects.reduce((acc, subject) => acc + subject.rating.length, 0);
    return totalRatings / user.subjects.length;
  };

  const getTotalSubjects = (user: UserType) => {
    return user.subjects.length;
  };

  // Dados para o gráfico de média
  const averageChartData = {
    labels: userData.map(user => user.name || "Sem Nome"),
    datasets: [
      {
        label: "Média de Ratings por Usuário",
        data: userData.map(getAverageRating),
        backgroundColor: "rgba(54, 162, 235, 0.5)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
    ],
  };

  // Dados para o gráfico de rosca (Doughnut)
  const doughnutChartData = {
    labels: userData.reduce<string[]>((allSubjects, user) => {
      user.subjects.forEach(subject => {
        if (!allSubjects.includes(subject.name)) {
          allSubjects.push(subject.name);
        }
      });
      return allSubjects;
    }, []),
    datasets: [
      {
        data: userData.map(user => user.subjects.length),
        backgroundColor: ["rgba(255, 99, 132, 0.5)", "rgba(75, 192, 192, 0.5)", "rgba(255, 206, 86, 0.5)"],
        borderColor: ["rgba(255, 99, 132, 1)", "rgba(75, 192, 192, 1)", "rgba(255, 206, 86, 1)"],
        borderWidth: 1,
      },
    ],
  };
  
  // Dados para o gráfico vertical existente
  const verticalChartData = {
    labels: ["Quantidade de Cadastros", "Quantidade Total de Ratings"],
    datasets: [
      {
        label: "Quantidade",
        data: [userData.length, getTotalRatings(userData)],
        backgroundColor: ["rgba(75, 192, 192, 0.2)", "rgba(255, 99, 132, 0.2)"],
        borderColor: ["rgba(75, 192, 192, 1)", "rgba(255, 99, 132, 1)"],
        borderWidth: 1,
      },
    ],
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center">
        <div className="hidden lg:block">
          <HeaderSvg />
        </div>
        <div className="flex flex-wrap m-2">
          <div className="w-full lg:w-1/2 p-2">
            <HorizontalBar data={averageChartData} />
            
          </div>
          <div className="w-full lg:w-1/2 p-2">
            <DoughnutChart data={doughnutChartData} />
          </div>
          <div className="w-full p-2">
            <Vertical data={verticalChartData} />
          </div>
        </div>
      </div>
    </>
  );
};



export default Chat;