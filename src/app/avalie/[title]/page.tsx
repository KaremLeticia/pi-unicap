"use client"
import { useState } from "react";
import Question from "../../components/Question";
import Text from "../../components/Text";

const titles = [
  "1.1 Foi assídua e pontual.",
  "1.2 Demonstrou conhecimento atualizado e domínio do conteúdo das disciplinas.",
  "1.3 Promoveu a integração da teoria com a prática.",
  "1.4 Demonstrou conhecimento atualizado e domínio do conteúdo das disciplinas.",
  "1.5 Demonstrou clareza na exposição do conteúdo das disciplinas.",
  "1.6 Utilizou metodologias inovadoras ativas.",
  "1.7 Utilizou recursos adequados ao ensino das disciplinas.",
  "1.8 Apresentou avaliações coerentes com os conteúdos ministrados.",
  "1.9 Apresentou um bom relacionamento com a turma e proporcionou um clima de respeito mútuo e ético.",
  "2.0 Informações adicionais, observações ou sugestões (Opcional)."
];

export default function Page({ params }:
  { params: { title: string } }) {


    const handleFormSubmit = (responses: number[]) => {
      console.log('Respostas:', responses);
      console.log('Comentário:', );
    };
  
  

  return (
    <section>
      <div className="flex flex-col justify-center p-6">
        <Text size="2xl" fontFamily="sans" weight="semibold">1. Avaliação das Disciplinas do curso</Text>
        <Text>{decodeURIComponent(params.title)}</Text>

        <Text>Manifeste o seu grau de concordância com as afirmações a seguir, segundo a escala que apresenta uma variação de 1 (discordo totalmente) a 5 (concordo plenamente). Caso você julgue não ter elementos para avaliar a afirmação ou quando considerar não pertinente ao seu curso, assinale a opção “Sem Opinião/Não se aplica” como 0.</Text>
      </div>
      <div>
        <Question titles={titles} onSubmit={handleFormSubmit} />
       
      </div>
    </section>
  );
}