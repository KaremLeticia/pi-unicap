import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const POST = async (request: Request, { params }: { params: { userId: string; subjectId: string } }) => {
  try {
    const body = await request.json();
    const userId = params?.userId;
    const subjectId = params?.subjectId;

    if (!userId || !subjectId) {
      return NextResponse.json({ error: 'Parâmetros inválidos.' }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      return NextResponse.json({ error: 'Usuário não encontrado.' }, { status: 404 });
    }

    // Criar a avaliação com base nos novos requisitos
    const createdRating = await prisma.rating.create({
      data: {
        title: body.title,
        values: body.values, // assumindo que os valores são fornecidos no corpo da solicitação
        userId: userId,
        subjectId: Number(subjectId),
      },
    });

    return NextResponse.json(createdRating, { status: 201 });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: 'Erro ao criar avaliação.' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};
