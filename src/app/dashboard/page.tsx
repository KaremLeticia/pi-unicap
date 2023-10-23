"use client"
import Card from "@/app/components/Card";
import Text from "@/app/components/Text";
import formatarDataHora from "@/app/utils/Date"
import Head from 'next/head';

export default function Dashboard() {

  const dataAtual = new Date();
  const dataFormatada = formatarDataHora(dataAtual);


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
        <Card title="Tarefa 1" description="Esta é a descrição da tarefa 1." status="feito" />
        <Card title="Tarefa 2" description="Esta é a descrição da tarefa 2." status="pendente" />
        <Card title="Tarefa 3" description="Esta é a descrição da tarefa 3." status="incompleto" />
      </div>
    </>
  );
}