// Importando os módulos necessários
import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

// Inicializando o PrismaClient
const prisma = new PrismaClient();

// Função principal da rota PATCH
export default async (req: NextApiRequest, res: NextApiResponse) => {
  // Verificando se o método da requisição é PATCH
  if (req.method === 'PATCH') {
    try {
      // Obtendo o ID do subject a partir dos parâmetros da URL
      const { id } = req.query;

      // Verificando se o ID foi fornecido
      if (!id) {
        return res.status(400).json({ error: 'ID do subject não fornecido.' });
      }

      // Obtendo o corpo da requisição
      const { rating } = req.body;

      // Atualizando os valores de rating do subject com o ID fornecido
      const updatedSubject = await prisma.subject.update({
        where: { id: Number(id) },
        data: {
          rating,
        },
      });

      // Respondendo com o subject atualizado
      return res.status(200).json(updatedSubject);
    } catch (error) {
      console.error(error);
      // Respondendo com erro em caso de falha na atualização
      return res.status(500).json({ error: 'Erro ao atualizar o subject.' });
    } finally {
      // Desconectando o PrismaClient após a operação
      await prisma.$disconnect();
    }
  } else {
    // Respondendo com erro se o método da requisição não for PATCH
    res.status(405).json({ error: 'Método não permitido.' });
  }
};
