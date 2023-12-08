import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export const POST = async (request: Request) => {
  try {
    const { email, password, subjects } = await request.json();

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        subjects: {
          create: subjects,
        },
      },
      include: {
        subjects: true,
      },
    });

    return NextResponse.json(user, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Erro ao criar usuário.' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};

export const GET = async (request: Request) => {
  try {
    const users = await prisma.user.findMany({
      include: {
        subjects: true,
      },
    });

    return NextResponse.json(users, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Erro ao obter usuários.' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};

export const PUT = async (request: Request) => {
  try {
    const { id, email, password, subjects } = await request.json();

    const hashedPassword = await bcrypt.hash(password, 10);

    const updatedUser = await prisma.user.update({
      where: { id },
      data: {
        email,
        password: hashedPassword,
        subjects: {
          upsert: subjects.map((subject: { id: any; }) => ({
            where: { id: subject.id },
            update: subject,
            create: subject,
          })),
        },
      },
      include: {
        subjects: true,
      },
    });

    return NextResponse.json(updatedUser, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Erro ao atualizar usuário.' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};

export const DELETE = async (request: Request) => {
  try {
    const { id } = await request.json();

    const deletedUser = await prisma.user.delete({
      where: { id },
      include: {
        subjects: true,
      },
    });

    return NextResponse.json(deletedUser, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Erro ao excluir usuário.' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};
