import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'PUT') {
    try {
      const { userId } = req.query;
      const { ratings } = req.body;

      const updatedUser = await prisma.user.update({
        where: { id: userId as string },
        data: {
          subjects: {
            upsert: ratings.map((rating: { subjectId: number; values: number[] }) => ({
              where: { subjectId: rating.subjectId },
              update: { rating: rating.values },
              create: {
                name: 'Default Name',
                rating: rating.values,
              },
            })),
          },
        },
        include: {
          subjects: true,
        },
      });

      res.status(200).json(updatedUser);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao atualizar as avaliações do usuário.' });
    } finally {
      await prisma.$disconnect();
    }
  } else {
    res.status(405).json({ error: 'Método não permitido.' });
  }
};
