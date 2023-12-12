import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const POST = async (request: Request, { params }: { params: { userId: string } }) => {
  try {
    const body = await request.json();
    const userId = params?.userId;

    if (!userId) {
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

    // Certifique-se de converter os valores para números
    const values = body.values.map((value: any) => Number(value));

    const createdRating = await prisma.rating.create({
      data: {
        title: body.title,
        values: values,
        userId: userId,
      } as any,
    });

    return NextResponse.json(createdRating, { status: 201 });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: 'Erro ao criar avaliação.' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};
