import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const GET = async (request: Request, { params }: { params: { id: string } }) => {
  try {
    const subject = await prisma.subject.findUnique({
      where: {
        id: Number(params.id),
      },
    });

    if (!subject) {
      return NextResponse.json({ error: 'Matéria não encontrada.' }, { status: 404 });
    }

    return NextResponse.json(subject, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao buscar matéria.' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};

export const PATCH = async (request: Request, { params }: { params: { id: string } }) => {
  const body = await request.json();

  try {
    const updatedSubject = await prisma.subject.update({
      where: {
        id: Number(params.id),
      },
      data: {
        name: body.name,
        rating: body.rating,
      },
    });

    return NextResponse.json(updatedSubject, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao atualizar matéria.' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};

export const DELETE = async (request: Request, { params }: { params: { id: string } }) => {
  try {
    const deletedSubject = await prisma.subject.delete({
      where: {
        id: Number(params.id),
      },
    });

    return NextResponse.json(deletedSubject, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao excluir matéria.' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};
