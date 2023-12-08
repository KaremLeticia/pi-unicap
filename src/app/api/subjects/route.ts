import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: Request) {
  return new Response('Hello, get de subjects!!')
}


export const POST = async (request: Request) => {
  const { name, rating, userId } = await request.json();

  try {
    const subject = await prisma.subject.create({
      data: {
        name,
        rating,
        userId,
      },
    });

    return NextResponse.json(subject, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao criar matéria.' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};

