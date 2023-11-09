"use client"
import Card from "@/app/components/Card";
import Text from "@/app/components/Text";
import formatarDataHora from "@/app/utils/Date"
import Head from 'next/head';

export default function Dashboard() {

  const dataAtual = new Date();
  const dataFormatada = formatarDataHora(dataAtual);

  const cardsData = [
    {
      title: "Lógica de Programação",
      description: "SIN1001",
      status: "feito",
    },
    {
      title: "Inglês aplicado à informática",
      description: "LET1638",
      status: "pendente",
    },
    {
      title: "Fundamentos da computação",
      description: "SIN1002",
      status: "incompleto",
    },
    {
      title: "Projeto Integrador I",
      description: "SIN1006",
      status: "incompleto",
    },
    {
      title: "Introdução à Programação para Web",
      description: "SIN1004",
      status: "incompleto",
    },
  ];

  return (
    <>
      <Head>
        <title>Sistema de Avaliação • UNICAP </title>
      </Head>
      <div className="mb-8">
        <Text size="2xl" weight="semibold" fontFamily="sans" color="black">
          Nome do aluno
        </Text>
        <Text size="xl" weight="normal" fontFamily="sans" color="black" >
          {dataFormatada}
        </Text>
      </div>

      
      <div className="flex flex-col">
        {cardsData.map((card, index) => (
          <Card
            key={index}
            title={card.title}
            description={card.description}
            status={card.status}
          />
        ))}
      </div>
    </>
  );
}